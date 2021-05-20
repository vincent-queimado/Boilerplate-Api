import httpMsg from '@utils/http_handler/http_msg'
import servUpdateAdmin from '@apiserv/admin/admins/_delete'
import servFindOneAdmin from '@apiserv/admin/admins/_get_by_field'

const errCode = 'ERROR_ADMIN_DELETE_ADMIN'

export default async (id) => {
  // Check admin data
  if (!id) { return (httpMsg.http422('Admin data missing.', errCode)) }

  // Check existing admin
  let resultFindAdmin = await servFindOneAdmin(id, 'email', ['password', 'tokenResetPassword', 'tokenSignupConfirmation', 'deleted'], false)
  if (!resultFindAdmin.success) { return (httpMsg.http422('Error to check existing admin.', errCode)) }
  if (!resultFindAdmin.data) { return (httpMsg.http422('Admin not exist or already deleted.', errCode)) }

  // Disable admin
  let resultUpdateAdmin = await servUpdateAdmin(id)
  if (!resultUpdateAdmin.success || !resultUpdateAdmin.data) { return (httpMsg.http422('Error to update admin.', errCode)) }

  if (resultUpdateAdmin.data[1][0].dataValues.password !== undefined) { await delete resultUpdateAdmin.data[1][0].dataValues.password }
  if (resultUpdateAdmin.data[1][0].dataValues.tokenResetPassword !== undefined) { await delete resultUpdateAdmin.data[1][0].dataValues.tokenResetPassword }
  if (resultUpdateAdmin.data[1][0].dataValues.tokenSignupConfirmation !== undefined) { await delete resultUpdateAdmin.data[1][0].dataValues.tokenSignupConfirmation }

  return (httpMsg.http200(resultUpdateAdmin.data[1][0]))
}
