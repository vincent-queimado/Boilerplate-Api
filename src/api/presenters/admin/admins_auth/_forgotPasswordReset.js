import moment from 'moment'
import config from '@config/app'
import httpMsg from '@utils/http_handler/http_msg'
import servUpdateAdmin from '@apiserv/admin/admins/_update'
import servFindOneAdmin from '@apiserv/admin/admins/_get_by_field'
import servHashPassword from '@apiserv/tools/_generate_hash_password'

const conf = config[process.env.NODE_ENV]
const errCode = 'ERROR_ADMIN_FORGOT_PASSWORD_RESET'

export default async (data) => {
  // Check admin data
  if (!data.email || !data.token || !data.password) {return (httpMsg.http422('Data missing.', errCode)) }

  // Check existing admin
  let resultFindAdmin = await servFindOneAdmin(data.email, 'email', ['password', 'tokenSignupConfirmation', 'deleted'], false)
  if (!resultFindAdmin.success) { return (httpMsg.http422('Error to check existing admin.', errCode)) }
  if (!resultFindAdmin.data) { return (httpMsg.http422('Reset password error.', errCode)) }
  
  // Check time of last request
  if (moment().isAfter(moment(resultFindAdmin.data.updatedAt).add(conf.app.forgotPassword.resetPasswordExpired, 'hours'))) { return (httpMsg.http422('Confirmation time expired.', errCode)) }
 
  // Check admin token
  if (resultFindAdmin.data.tokenResetPassword !== data.token) { return (httpMsg.http422('Reset admin password error.', errCode)) }
  
  // Hash password
  let resultHashPassword = await servHashPassword(data.password)
  if (!resultHashPassword.success || !resultHashPassword.data) { return (httpMsg.http422('Error to hash the admin password.', errCode)) }
  data.password = resultHashPassword.data

  // Update signup confirmation status
  let result = await servUpdateAdmin(resultFindAdmin.data.id, { password: data.password })
  if (!result.success || !result.data) { return (httpMsg.http422('Error to update admin.', errCode)) }

  return (httpMsg.http200({ email: data.email }))
}