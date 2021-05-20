import randtoken from 'rand-token'
import httpMsg from '@utils/http_handler/http_msg'
import sendgrid from '@services/email/sendgrid/emails/admin'
import servCreateAdmin from '@apiserv/admin/admins/_save'
import servUpdateAdmin from '@apiserv/admin/admins/_update'
import servFindOneAdmin from '@apiserv/admin/admins/_get_by_field'
import servCreatePassword from '@apiserv/tools/_generate_password'
import servHashPassword from '@apiserv/tools/_generate_hash_password'

const errCode = 'ERROR_ADMIN_AUTH_SIGNUP'

export default async (data) => {
  let result = null
 
  // Check admin data
  if (!data.name || !data.email || !data.password) { return (httpMsg.http422('Admin data missing.', errCode)) }

  // Data filter
  let dataFiltered = {}
  if (data.name) { dataFiltered.name = data.name }
  if (data.email) { dataFiltered.email = data.email}

  // Check existing admin
  let resultFindAdmin = await servFindOneAdmin(data.email, 'email', ['password', 'tokenResetPassword', 'tokenSignupConfirmation', 'deleted'], true)
  if (!resultFindAdmin.success) { return (httpMsg.http422('Error to check existing admin.', errCode)) }

  // Check admin status
  if (resultFindAdmin.data) {
    if (resultFindAdmin.data.signupConfirmation === 'confirmed' ) { return (httpMsg.http422('Admin already registered.', errCode)) }
  }

  // Generate password
  if (!data.password){
    let resultCreatePassword = await servCreatePassword()
    if (!resultCreatePassword.success || !resultCreatePassword.data) { return (httpMsg.http422('Error to generate a admin password.', errCode)) }
    dataFiltered.password = resultCreatePassword.data
  } else {
    let resultHashPassword = await servHashPassword(data.password)
    if (!resultHashPassword.success || !resultHashPassword.data) { return (httpMsg.http422('Error to hash the admin password.', errCode)) }
    dataFiltered.password = resultHashPassword.data
  }
  
  // Generate token
  dataFiltered.tokenSignupConfirmation = randtoken.suid(16)
  dataFiltered.tokenResetPassword = randtoken.suid(16)
  
  // Send confirmation email
  let resultSendEmail = await sendgrid.emailVerification(dataFiltered)
  if (!resultSendEmail.success) { return (httpMsg.http422('Error to sending conformation email.', errCode)) }
  
  // Create new admin
  if (!resultFindAdmin.data){
    result = await servCreateAdmin(dataFiltered)
    if (!result.success || !result.data) { return (httpMsg.http422('Error to save data admin.', errCode)) }
  
    if (result.data.dataValues.password !== undefined) { await delete result.data.dataValues.password }
    if (result.data.dataValues.tokenResetPassword !== undefined) { await delete result.data.dataValues.tokenResetPassword }
    if (result.data.dataValues.tokenSignupConfirmation !== undefined) { await delete result.data.dataValues.tokenSignupConfirmation }
    if (result.data.dataValues.deleted !== undefined) { await delete result.data.dataValues.deleted }  
  
    return (httpMsg.http200(result.data))
  }

  // Update deleted admin
  if (resultFindAdmin.data){
    dataFiltered.deleted = false 
    dataFiltered.signupConfirmation = "pending"
    
    result = await servUpdateAdmin(resultFindAdmin.data.id, dataFiltered)
    if (!result.success || !result.data) { return (httpMsg.http422('Error to update admin.', errCode)) }
  
    if (result.data[1][0].dataValues.password !== undefined) { await delete result.data[1][0].dataValues.password }
    if (result.data[1][0].dataValues.tokenResetPassword !== undefined) { await delete result.data[1][0].dataValues.tokenResetPassword }
    if (result.data[1][0].dataValues.tokenSignupConfirmation !== undefined) { await delete result.data[1][0].dataValues.tokenSignupConfirmation }
    if (result.data[1][0].dataValues.deleted !== undefined) { await delete result.data[1][0].dataValues.deleted }
  
    return (httpMsg.http200(result.data[1][0]))
  }

  
}