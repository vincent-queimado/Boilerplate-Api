const jwt = require('jsonwebtoken')
const config = require('./../config/app')
const randomPassword = require('./../api/services/tools/_generate_password')
const hashPassword = require('./../api/services/tools/_generate_hash_password')
const userRead = require('./../api/services/client/users/read')
const userCreate = require('./../api/services/client/users/create')
const userUpdate = require('./../api/services/client/users/update')

const env = process.env.NODE_ENV || 'development'
const conf = config[env]

const authUnauthorized = '/web/signin'

exports.verify = async (req, res, next) => {
    var token = req.cookies.token || ''

    if (!token) return res.redirect(authUnauthorized)

    var verified = verifyToken(token)

    console.log(verified)

    if (verified.error) return res.redirect(authUnauthorized)

    if (verified.payload) {
        req.user = { 
            id: verified.payload.id, 
            name: verified.payload.name, 
            email: verified.payload.email,
            avatar: verified.payload.avatar 
        }
    }
 
    next()
}

exports.googleAuth = async (userDatas) => {
    let token = null
    let user = null

    if (userDatas.email){
        user = await userRead(userDatas.email)
        
        if (user.data){
            //console.log('User alerady exist!')

            var given_name =  user.data.given_name || userDatas.given_name
            var family_name =  userDatas.family_name
            var locale = user.data.locale || userDatas.locale
            var avatar = user.data.avatar || userDatas.picture

            const updateUser = await userUpdate({ given_name, family_name, locale, avatar }, { email: userDatas.email })
            if (!updateUser.success) return ({ success: false, data: null, error: "UPDATE_USER" })
     
            token = await generateToken(user.data.id, user.data.name, user.data.email, avatar)

        } else {
            //console.log('User not exist. Creating user!')
            var passwordRandomed = await randomPassword()
            var passwordHashed = await hashPassword(passwordRandomed.data)

            user = await userCreate({ 
                email: userDatas.email, 
                name: userDatas.name, 
                given_name: userDatas.given_name, 
                family_name: userDatas.family_name,
                locale: userDatas.locale, 
                avatar: userDatas.picture,
                password: passwordHashed.data,
                signupConfirmation: "confirmed"
            })
            token = await generateToken(user.data.id, user.data.name, user.data.email, user.data.avatar)
        }

    }
    return ({ user: user.data, token })
}

function generateToken(id, name, email, avatar) {
    var token = jwt.sign({ id: id, name: name, email: email, avatar: avatar }, conf.session.secret, { expiresIn: conf.jwt.expiredIn })
    return token
}

function verifyToken(token) {
    let res = jwt.verify(token, conf.session.secret, function(err, decoded) {
        if (err) {
            return ({ error: err.message || err, payload: null })
        }
        return ({ error: null, payload: decoded })
      })
    return res
}
