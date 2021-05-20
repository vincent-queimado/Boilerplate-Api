import httpMsg from '@utils/http_handler/http_msg'
import servCreateUser from '@apiserv/client/users/_save'
import servFindOneUser from '@apiserv/client/users/_get_by_field'
import servCreatePassword from '@apiserv/tools/_generate_password'

const errCode = 'ERROR_ADMIN_CREATE_USER'

export default async (data) => {
  // Check user data
  if (!data.name || !data.email) { return (httpMsg.http422('User data missing.', errCode)) }

  // Check existing user
  let resultFindUser = await await servFindOneUser(data.email, 'email', ['password', 'tokenResetPassword', 'tokenSignupConfirmation', 'deleted'], false)
  if (!resultFindUser.success) { return (httpMsg.http422('Error to check existing user.', errCode)) }
  if (resultFindUser.data) { return (httpMsg.http422('User already exist.', errCode)) }
 
  // Generate password
  let resultCreatePassword = await servCreatePassword()
  if (!resultCreatePassword.success || !resultCreatePassword.data) { return (httpMsg.http422('Error to generate a user password.', errCode)) }
  data.password = resultCreatePassword.data

  // Create new user
  let resultCreateNewUser = await servCreateUser(data)
  if (!resultCreateNewUser.success || !resultCreateNewUser.data) { return (httpMsg.http422('Error to save data user.', errCode)) }

  if (resultCreateNewUser.data.dataValues.password !== undefined) { await delete resultCreateNewUser.data.dataValues.password }
  if (resultCreateNewUser.data.dataValues.tokenResetPassword !== undefined) { await delete resultCreateNewUser.data.dataValues.tokenResetPassword }
  if (resultCreateNewUser.data.dataValues.tokenSignupConfirmation !== undefined) { await delete resultCreateNewUser.data.dataValues.tokenSignupConfirmation }
  if (resultCreateNewUser.data.dataValues.deleted !== undefined) { await delete resultCreateNewUser.data.dataValues.deleted }

  return (httpMsg.http200(resultCreateNewUser.data))
}