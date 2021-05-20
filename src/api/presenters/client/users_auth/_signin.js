import httpMsg from '@utils/http_handler/http_msg'
import servFindOneUser from '@apiserv/client/users/_get_by_field'
import servCheckPassword from '@apiserv/tools/_check_password'
import servGenerateToken from '@apiserv/tools/_generate_token_access'

const errCode = 'ERROR_USER_AUTH_SIGNIN'

export default async (data) => {

  // Check user data
  if (!data.email || !data.password) { return (httpMsg.http422('User data missing.', errCode)) }

  // Check existing user
  let resultFindUser = await servFindOneUser(data.email, 'email', ['tokenResetPassword', 'tokenSignupConfirmation', 'deleted'], false)
  if (!resultFindUser.success) { return (httpMsg.http422('Error to check existing user.', errCode)) }
  if (!resultFindUser.data) { return (httpMsg.http401('User not found.', errCode)) }
  
  // Check password
  let resultCheckPassword = await servCheckPassword(data.password, resultFindUser.data.password)
  if (!resultCheckPassword.success) { return (httpMsg.http401('Invalid password.', errCode)) }

  // Generate token access
  let resultGenerateToken = await servGenerateToken(resultFindUser.data.id, resultFindUser.data.name, resultFindUser.data.email, resultFindUser.data.avatar)
  if (!resultGenerateToken.success) { return (httpMsg.http401('Erro to generate token.', errCode)) }

  return (httpMsg.http200({ name: resultFindUser.data.name, email: resultFindUser.data.email, token: resultGenerateToken.data }))
}