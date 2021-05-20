import fs from 'fs'
import configApp from '@config/app'
import configEmail from'@config/email'
import sendgrid from '@services/email/sendgrid/core/sendgrid'
import htmlMsg from '@services/email/templates/forgot-password-request.html'

const confEmail = configEmail[process.env.NODE_ENV]
const confApp = configApp[process.env.NODE_ENV]

export default async (data) => {

  // Check user data
  if (!data.email || !data.tokenResetPassword) { return ({ success: false, data: null, error: 'Data missing' }) }

  // Set options
  let mailOptions

  let to = data.email
  let from = confEmail.sendgrid.fromEmail

  let subject = 'WebApi - Redefine sua senha'

  let plainText = 'Redefine sua senha'
  let htmlText = '<span>Redefine sua senha<span>'

  let templateId = confEmail.sendgrid.templates.forgot_password_request

  let name = data.name
  let url = confApp.app.forgotPassword.urlForgotPasswordReset + '?email=' + data.email + '&token=' + data.tokenResetPassword

  // send method
  if (confEmail.sendgrid.useLocalTemplates) {
    htmlText = fs.readFileSync(htmlMsg, {encoding:'utf-8'}).toString()
    htmlText = htmlText.replace('{{name}}', data.name)
    htmlText = htmlText.replace('{{url}}', url)

    mailOptions = {
      to,
      from,
      subject,
      text: plainText,
      html: htmlText
    }
  } else {
    mailOptions = {
      to,
      from,
      templateId,
      dynamicTemplateData: {
          name,
          url
      }
    }
  }

  // Send email with local template
  let sendResult = await sendgrid(mailOptions)
  if (!sendResult.success) { return ({ success: false, data: null, error: sendResult.error }) }

  // Success return
  return ({ success: true, data: sendResult.data, error: null })
}
