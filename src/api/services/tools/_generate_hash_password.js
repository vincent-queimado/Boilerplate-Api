import bcrypt from 'bcryptjs'

export default async (password) => {
  const saltRounds = 10

  if (!password) { return ({ success: false, data: null, error: 'Error to hash password. Data missing' }) }

  let hashPassword = bcrypt.hashSync(password, saltRounds)
  
  if (!bcrypt.compareSync(password, hashPassword)) { 
    return ({ success: false, data: null, error: 'Error to hash password. Invalid credentials.' }) 
  }
  console.log(hashPassword)
  return ({ success: true, data: hashPassword, error: null })
}