import httpMsg from '@utils/http_handler/http_msg'
import servUpdateAdmin from '@apiserv/admin/admins/_update'
import servHashPassword from '@apiserv/tools/_generate_hash_password'

const errCode = 'ERROR_ADMIN_UPDATE_ADMIN'

export default async (id, data) => {
  // Check admin data
  if (!id || !Object.keys(data).length) { return (httpMsg.http422('Admin data missing.', errCode)) }

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

  // Update admin
  let result = await servUpdateAdmin(id, dataFiltered)
  if (!result.success || !result.data) { return (httpMsg.http422('Error to update admin.', errCode)) }

  if (result.data[1][0].dataValues.password !== undefined) { await delete result.data[1][0].dataValues.password }
  if (result.data[1][0].dataValues.tokenResetPassword !== undefined) { await delete result.data[1][0].dataValues.tokenResetPassword }
  if (result.data[1][0].dataValues.tokenSignupConfirmation !== undefined) { await delete result.data[1][0].dataValues.tokenSignupConfirmation }
  if (result.data[1][0].dataValues.deleted !== undefined) { await delete result.data[1][0].dataValues.deleted }

  return (httpMsg.http200(result.data[1][0]))
}
