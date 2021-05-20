import moment from 'moment'
import config from '@config/app'
import httpMsg from '@utils/http_handler/http_msg'
import sendgrid from '@services/email/sendgrid/emails/admin'
import servUpdateAdmin from '@apiserv/admin/admins/_update'
import servFindOneAdmin from '@apiserv/admin/admins/_get_by_field'

const conf = config[process.env.NODE_ENV]
const errCode = 'ERROR_ADMIN_SIGNUP_CONFIRM'

export default async (data) => {

  // Check admin data
  if (!data.email || !data.token) { return (httpMsg.http422('Signup confirmation data missing.', errCode)) }

  // Check existing admin
  let resultFindAdmin = await servFindOneAdmin(data.email, 'email', ['password', 'tokenResetPassword', 'deleted'], false)
  if (!resultFindAdmin.success) { return (httpMsg.http422('Error to check existing admin.', errCode)) }
  if (!resultFindAdmin.data) { return (httpMsg.http422('Signup confirmation failed.', errCode)) }

  // Check if already confirmed
  if (resultFindAdmin.data.signupConfirmation === 'confirmed') { return (httpMsg.http422('Admin already confirmed.', errCode)) }
 
  // Check time of last signup
  if (moment().isAfter(moment(resultFindAdmin.data.updatedAt).add(conf.app.signup.emailConfirmExpired, 'hours'))) { return (httpMsg.http422('Confirmation time expired.', errCode)) }
 
  // Check admin token
  if (resultFindAdmin.data.tokenSignupConfirmation !== data.token) { return (httpMsg.http422('Signup confirmation error.', errCode)) }

  // Send welcome email
  let resultSendEmail = await sendgrid.welcome(data)
  if (!resultSendEmail.success) { return (httpMsg.http422('Error to sending welcome email.', errCode)) }
  
  // Update signup confirmation status
  let result = await servUpdateAdmin(resultFindAdmin.data.id, { signupConfirmation: 'confirmed' })
  if (!result.success || !result.data) { return (httpMsg.http422('Error to update admin.', errCode)) }

  return (httpMsg.http200({ email: data.email, signupConfirmation: 'confirmed' }))
}