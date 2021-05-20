import randtoken from 'rand-token'
import httpMsg from '@utils/http_handler/http_msg'
import sendgrid from '@services/email/sendgrid/emails/admin'
import servUpdateAdmin from '@apiserv/admin/admins/_update'
import servFindOneAdmin from '@apiserv/admin/admins/_get_by_field'

const errCode = 'ERROR_ADMIN_FORGOT_PASSWORD_REQUEST'

export default async (data) => {
  let dataFiltered = {}

  // Check admin data
  if (!data.email) { return (httpMsg.http422('Signup confirmation data missing.', errCode)) }

  // Check existing admin
  let resultFindAdmin = await servFindOneAdmin(data.email, 'email', ['password', 'tokenResetPassword', 'deleted'], false)
  if (!resultFindAdmin.success) { return (httpMsg.http422('Error to check existing admin.', errCode)) }
  if (!resultFindAdmin.data) { return (httpMsg.http422('Signup confirmation error.', errCode)) }

  // Check if already confirmed
  if (resultFindAdmin.data.signupConfirmation === 'pending') { return (httpMsg.http422('Admin has not verified their email address.', errCode)) }
 
  // Generate token
  dataFiltered.tokenResetPassword = randtoken.suid(16)

  // Update token reset token
  let result = await servUpdateAdmin(resultFindAdmin.data.id, dataFiltered)
  if (!result.success || !result.data) { return (httpMsg.http422('Error to update admin.', errCode)) }

  // Send confirmation email
  dataFiltered.email = resultFindAdmin.data.email
  dataFiltered.name = resultFindAdmin.data.name
  let resultSendEmail = await sendgrid.forgotPasswordRequest(dataFiltered)
  if (!resultSendEmail.success) { return (httpMsg.http422('Error to sending forgot password request email.', errCode)) }

  return (httpMsg.http200({ email: data.email }))
}