
const jwt = require('src/middlewares/jwt_auth')
const config = require('src/config/app')
const OAuth2Data = require('src/providers/google/google_key.json')
const { google } = require('googleapis')

const env = process.env.NODE_ENV || 'development'
const conf = config[env]

const oAuth2Client = new google.auth.OAuth2(
    OAuth2Data.web.client_id, 
    OAuth2Data.web.client_secret, 
    OAuth2Data.web.redirect_uris[env]
)

const authLoginPage = '/signin/google'
const authUnauthorized = '/signin'
const authAuthorized = '/dashboard'
let isAuthenticated = false

exports.login = async (req, res) => {
    if (!isAuthenticated) {
        const url = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            prompt: "consent",
            scope: ['https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile'].join(' ')
        })
        res.redirect(url)
    } else {
        
        let oauth2 = google.oauth2({ auth: oAuth2Client, version: 'v2'})
        let userData = await oauth2.userinfo.v2.me.get({ auth: oAuth2Client })
        let authDatas = await jwt.googleAuth(userData.data)

        if (authDatas) {
            res.cookie('token', authDatas.token, { httpOnly: conf.session.httpOnly, secure: conf.session.secure, maxAge: conf.session.maxAge })
        }

        res.redirect(authAuthorized)
    }
}

exports.checkCode = async (req, res) => {
    const code = req.query.code

    if (code) {
        oAuth2Client.getToken(code, (err, tokens) => {
            if (err) {
                console.log('Error authenticating')
                console.log(err)
                res.redirect(authUnauthorized)
            } else {
                console.log('Successfully authenticated')
                oAuth2Client.setCredentials(tokens)
                isAuthenticated = true 
                res.redirect(authLoginPage)
            }
        })
    }
}