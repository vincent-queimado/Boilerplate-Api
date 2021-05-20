import httpMsg from '@utils/http_handler/http_msg'
import servUpdateUser from '@apiserv/client/users/_delete'
import servFindOneUser from '@apiserv/client/users/_get_by_field'

const errCode = 'ERROR_ADMIN_DELETE_USER'

export default async (id) => {
  // Check user data
  if (!id) { return (httpMsg.http422('User data missing.', errCode)) }

  // Check existing user
  let resultFindUser = await servFindOneUser(id, 'email', ['password', 'tokenResetPassword', 'tokenSignupConfirmation', 'deleted'], false)
  if (!resultFindUser.success) { return (httpMsg.http422('Error to check existing user.', errCode)) }
  if (!resultFindUser.data) { return (httpMsg.http422('User not exist or already deleted.', errCode)) }

  // Disable user
  let resultUpdateUser = await servUpdateUser(id)
  if (!resultUpdateUser.success || !resultUpdateUser.data) { return (httpMsg.http422('Error to update user.', errCode)) }

  if (resultUpdateUser.data[1][0].dataValues.password !== undefined) { await delete resultUpdateUser.data[1][0].dataValues.password }
  if (resultUpdateUser.data[1][0].dataValues.tokenResetPassword !== undefined) { await delete resultUpdateUser.data[1][0].dataValues.tokenResetPassword }
  if (resultUpdateUser.data[1][0].dataValues.tokenSignupConfirmation !== undefined) { await delete resultUpdateUser.data[1][0].dataValues.tokenSignupConfirmation }

  return (httpMsg.http200(resultUpdateUser.data[1][0]))
}
