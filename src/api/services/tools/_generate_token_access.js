import jwt from 'jsonwebtoken'
import config from '@config/app'

export default async (id, name, email, avatar) => {
  const conf = config[process.env.NODE_ENV]
  
  var token = jwt.sign({ 
    id: id, 
    name: name, 
    email: email, 
    avatar: avatar 
    }, 
    conf.session.secret, 
    { 
      expiresIn: conf.jwt.expiredIn 
    })

  return ({ success: true, data: token, error: null })
}