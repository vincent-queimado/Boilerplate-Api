import moment from 'moment'
import config from '@config/app'
import httpMsg from '@utils/http_handler/http_msg'
import sendgrid from '@services/email/sendgrid/emails/client'
import servUpdateUser from '@apiserv/client/users/_update'
import servFindOneUser from '@apiserv/client/users/_get_by_field'

const conf = config[process.env.NODE_ENV]
const errCode = 'ERROR_USER_AUTH_SIGNUP_CONFIRM'

export default async (data) => {
  // Check user data
  if (!data.email || !data.token) { return (httpMsg.http422('Signup confirmation data missing.', errCode)) }

  // Check existing user
  let resultFindUser = await servFindOneUser(data.email, 'email', ['password', 'tokenResetPassword', 'deleted'], false)
  if (!resultFindUser.success) { return (httpMsg.http422('Error to check existing user.', errCode)) }
  if (!resultFindUser.data) { return (httpMsg.http422('Signup confirmation failed.', errCode)) }

  // Check if already confirmed
  if (resultFindUser.data.signupConfirmation === 'confirmed') { return (httpMsg.http422('User already confirmed.', errCode)) }
 
  // Check time of last signup
  if (moment().isAfter(moment(resultFindUser.data.updatedAt).add(conf.app.signup.emailConfirmExpired, 'hours'))) { return (httpMsg.http422('Confirmation time expired.', errCode)) }
 
  // Check user token
  if (resultFindUser.data.tokenSignupConfirmation !== data.token) { return (httpMsg.http422('Signup confirmation error.', errCode)) }

  // Send welcome email
  let resultSendEmail = await sendgrid.welcome({ email: resultFindUser.data.email, name: resultFindUser.data.name })
  if (!resultSendEmail.success) { return (httpMsg.http422('Error to sending welcome email.', errCode)) }
  
  // Update signup confirmation status
  let result = await servUpdateUser(resultFindUser.data.id, { signupConfirmation: 'confirmed' })
  if (!result.success || !result.data) { return (httpMsg.http422('Error to update user.', errCode)) }

  return (httpMsg.http200({ email: data.email, signupConfirmation: 'confirmed' }))
}