import moment from 'moment'
import config from '@config/app'
import httpMsg from '@utils/http_handler/http_msg'
import servUpdateUser from '@apiserv/client/users/_update'
import servFindOneUser from '@apiserv/client/users/_get_by_field'
import servHashPassword from '@apiserv/tools/_generate_hash_password'

const conf = config[process.env.NODE_ENV]
const errCode = 'ERROR_USER_FORGOT_PASSWORD_RESET'

export default async (data) => {
  // Check user data
  if (!data.email || !data.token || !data.password) {return (httpMsg.http422('Data missing.', errCode)) }

  // Check existing user
  let resultFindUser = await servFindOneUser(data.email, 'email', ['password', 'tokenSignupConfirmation', 'deleted'], false)
  if (!resultFindUser.success) { return (httpMsg.http422('Error to check existing user.', errCode)) }
  if (!resultFindUser.data) { return (httpMsg.http422('Reset password error.', errCode)) }
  
  // Check time of last request
  if (moment().isAfter(moment(resultFindUser.data.updatedAt).add(conf.app.forgotPassword.resetPasswordExpired, 'hours'))) { return (httpMsg.http422('Confirmation time expired.', errCode)) }
 
  // Check user token
  if (resultFindUser.data.tokenResetPassword !== data.token) { return (httpMsg.http422('Reset password error.', errCode)) }
  
  // Hash password
  let resultHashPassword = await servHashPassword(data.password)
  if (!resultHashPassword.success || !resultHashPassword.data) { return (httpMsg.http422('Error to hash the user password.', errCode)) }
  data.password = resultHashPassword.data

  // Update signup confirmation status
  let result = await servUpdateUser(resultFindUser.data.id, { password: data.password })
  if (!result.success || !result.data) { return (httpMsg.http422('Error to update user.', errCode)) }

  return (httpMsg.http200({ email: data.email }))
}