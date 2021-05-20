import bcrypt from 'bcryptjs'

export default async (password, hashPassword) => {
  if (!password || !hashPassword) { return ({ success: false, data: null, error: 'Error to check password. Data missing' }) }

  if (!bcrypt.compareSync(password, hashPassword)) { 
    return ({ success: false, data: null, error: 'Error to check password. Invalid credentials.' }) 
  }

  return ({ success: true, data: password, error: null })
}