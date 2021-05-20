import httpMsg from '@utils/http_handler/http_msg'
import servCreateAdmin from '@apiserv/admin/admins/_save'
import servFindOneAdmin from '@apiserv/admin/admins/_get_by_field'
import servCreatePassword from '@apiserv/tools/_generate_password'

const errCode = 'ERROR_ADMIN_CREATE_ADMIN'

export default async (data) => {
  // Check admin data
  if (!data.name || !data.email) { return (httpMsg.http422('Admin data missing.', errCode)) }

  // Check existing admin
  let resultFindAdmin = await await servFindOneAdmin(data.email, 'email', ['password', 'tokenResetPassword', 'tokenSignupConfirmation', 'deleted'], false)
  if (!resultFindAdmin.success) { return (httpMsg.http422('Error to check existing admin.', errCode)) }
  if (resultFindAdmin.data) { return (httpMsg.http422('Admin already exist.', errCode)) }
 
  // Generate password
  let resultCreatePassword = await servCreatePassword()
  if (!resultCreatePassword.success || !resultCreatePassword.data) { return (httpMsg.http422('Error to generate a admin password.', errCode)) }
  data.password = resultCreatePassword.data

  // Create new admin
  let resultCreateNewAdmin = await servCreateAdmin(data)
  if (!resultCreateNewAdmin.success || !resultCreateNewAdmin.data) { return (httpMsg.http422('Error to save data admin.', errCode)) }

  if (resultCreateNewAdmin.data.dataValues.password !== undefined) { await delete resultCreateNewAdmin.data.dataValues.password }
  if (resultCreateNewAdmin.data.dataValues.tokenResetPassword !== undefined) { await delete resultCreateNewAdmin.data.dataValues.tokenResetPassword }
  if (resultCreateNewAdmin.data.dataValues.tokenSignupConfirmation !== undefined) { await delete resultCreateNewAdmin.data.dataValues.tokenSignupConfirmation }
  if (resultCreateNewAdmin.data.dataValues.deleted !== undefined) { await delete resultCreateNewAdmin.data.dataValues.deleted }

  return (httpMsg.http200(resultCreateNewAdmin.data))
}