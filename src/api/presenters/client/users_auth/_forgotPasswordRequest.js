import randtoken from 'rand-token'
import httpMsg from '@utils/http_handler/http_msg'
import sendgrid from '@services/email/sendgrid/emails/client'
import servUpdateUser from '@apiserv/client/users/_update'
import servFindOneUser from '@apiserv/client/users/_get_by_field'

const errCode = 'ERROR_USER_FORGOT_PASSWORD_REQUEST'

export default async (data) => {
  let dataFiltered = {}

  // Check user data
  if (!data.email) { return (httpMsg.http422('Signup confirmation data missing.', errCode)) }

  // Check existing user
  let resultFindUser = await servFindOneUser(data.email, 'email', ['password', 'tokenResetPassword', 'deleted'], false)
  if (!resultFindUser.success) { return (httpMsg.http422('Error to check existing user.', errCode)) }
  if (!resultFindUser.data) { return (httpMsg.http422('Signup confirmation error.', errCode)) }

  // Check if already confirmed
  if (resultFindUser.data.signupConfirmation === 'pending') { return (httpMsg.http422('User has not verified their email address.', errCode)) }
 
  // Generate token
  dataFiltered.tokenResetPassword = randtoken.suid(16)

  // Update token reset token
  let result = await servUpdateUser(resultFindUser.data.id, dataFiltered)
  if (!result.success || !result.data) { return (httpMsg.http422('Error to update user.', errCode)) }

  // Send confirmation email
  dataFiltered.email = resultFindUser.data.email
  dataFiltered.name = resultFindUser.data.name
  let resultSendEmail = await sendgrid.forgotPasswordRequest(dataFiltered)
  if (!resultSendEmail.success) { return (httpMsg.http422('Error to sending forgot password request email.', errCode)) }

  return (httpMsg.http200({ email: data.email }))
}