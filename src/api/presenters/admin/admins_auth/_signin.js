import httpMsg from '@utils/http_handler/http_msg'
import servFindOneAdmin from '@apiserv/admin/admins/_get_by_field'
import servCheckPassword from '@apiserv/tools/_check_password'
import servGenerateToken from '@apiserv/tools/_generate_token_access'

const errCode = 'ERROR_ADMIN_AUTH_SIGNIN'

export default async (data) => {
  // Check admin data
  if (!data.email || !data.password) { return (httpMsg.http422('Admin data missing.', errCode)) }

  // Check existing admin
  let resultFindAdmin = await servFindOneAdmin(data.email, 'email', ['tokenResetPassword', 'tokenSignupConfirmation', 'deleted'], false)
  if (!resultFindAdmin.success) { return (httpMsg.http422('Error to check existing admin.', errCode)) }
  if (!resultFindAdmin.data) { return (httpMsg.http401('Admin not found.', errCode)) }
  
  // Check password
  let resultCheckPassword = await servCheckPassword(data.password, resultFindAdmin.data.password)
  if (!resultCheckPassword.success) { return (httpMsg.http401('Invalid password.', errCode)) }

  // Generate token access
  let resultGenerateToken = await servGenerateToken(resultFindAdmin.data.id, resultFindAdmin.data.name, resultFindAdmin.data.email, resultFindAdmin.data.avatar)
  if (!resultGenerateToken.success) { return (httpMsg.http401('Erro to generate token.', errCode)) }
  
  return (httpMsg.http200({ name: resultFindAdmin.data.name, email: resultFindAdmin.data.email, token: resultGenerateToken.data }))
}