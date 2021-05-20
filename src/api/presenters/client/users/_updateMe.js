import httpMsg from '@utils/http_handler/http_msg'
import servUpdateUser from '@apiserv/client/users/_update'
import servHashPassword from '@apiserv/tools/_generate_hash_password'

const errCode = 'ERROR_USER_UPDATE_ME'

export default async (id, data) => {
  // Check user data
  if (!id || !Object.keys(data).length) { return (httpMsg.http422('User data missing.', errCode)) }

  // Data filter
  let dataFiltered = {}
  if (data.name) { dataFiltered.name = data.name }
  if (data.email) { dataFiltered.email = data.email}

  // Hash password
  if (data.password) {
    let resultHashPassword = await servHashPassword(data.password)
    if (!resultHashPassword.success || !resultHashPassword.data) { return ({ success: false, data: null, error: 'Eror to hash password' })  }  
    dataFiltered.password = resultHashPassword.data
  }

  // Update user
  let result = await servUpdateUser(id, dataFiltered)
  if (!result.success || !result.data) { return (httpMsg.http422('Error to update user.', errCode)) }

  if (result.data[1][0].dataValues.password !== undefined) { await delete result.data[1][0].dataValues.password }
  if (result.data[1][0].dataValues.tokenResetPassword !== undefined) { await delete result.data[1][0].dataValues.tokenResetPassword }
  if (result.data[1][0].dataValues.tokenSignupConfirmation !== undefined) { await delete result.data[1][0].dataValues.tokenSignupConfirmation }
  if (result.data[1][0].dataValues.deleted !== undefined) { await delete result.data[1][0].dataValues.deleted }

  return (httpMsg.http200(result.data[1][0]))
}
