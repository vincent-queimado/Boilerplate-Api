import httpMsg from '@utils/http_handler/http_msg'
import findOne from '@apiserv/client/users/_get_by_field'

const errCode = 'ERROR_USER_FIND_ME'

export default async (id) => {
  // Check user ID
  if (!id) { return (httpMsg.http422('User data missing.', errCode)) }

  // Find user ID
  let result = await findOne(id, 'id', ['password', 'tokenResetPassword', 'tokenSignupConfirmation', 'deleted'], false)
  if (!result.success || !result.data) { return (httpMsg.http422('Error to find user.', errCode)) }

  return (httpMsg.http200(result.data))
}
