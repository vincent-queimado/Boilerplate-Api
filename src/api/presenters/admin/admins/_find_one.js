import httpMsg from '@utils/http_handler/http_msg'
import findOne from '@apiserv/admin/admins/_get_by_field'

const errCode = 'ERROR_ADMIN_FIND_ONE_ADMIN'

export default async (id) => {
  // Check admin ID
  if (!id) { return (httpMsg.http422('Admin data missing.', errCode)) }

  // Find admin ID
  let result = await findOne(id, 'email', ['password', 'tokenResetPassword', 'tokenSignupConfirmation', 'deleted'], false)
  if (!result.success || !result.data) { return (httpMsg.http422('Error to find admin.', errCode)) }

  return (httpMsg.http200(result.data))
}
