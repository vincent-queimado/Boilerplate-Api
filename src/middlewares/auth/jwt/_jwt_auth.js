import jwt from 'jsonwebtoken'
import config from '@config/app'
import httpMsg from '@utils/http_handler/http_msg'

const conf = config[process.env.NODE_ENV]

export default async (req) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    let user

    if (!token) return (httpMsg.http401('Invalid token'))
    
    let verified = verifyToken(token)

    if (verified.error) return (httpMsg.http401('Invalid token'))
    
    if (verified.payload) {
        user = { 
            id: verified.payload.id, 
            name: verified.payload.name, 
            email: verified.payload.email,
            avatar: verified.payload.avatar 
        }
    }
 
    return ({ success: true, data: user })
}

function verifyToken(token) {
    let result = jwt.verify(token, conf.session.secret, function(err, decoded) {
        if (err) {
            return ({ error: err.message || err, payload: null })
        }
        return ({ error: null, payload: decoded })
      })
    return result
}
