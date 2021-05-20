import fs from 'fs'
import config from '@config/email'
import sendgrid from '@services/email/sendgrid/core/sendgrid'
import htmlMsg from '@services/email/templates/email-verification.html'

const conf = config[process.env.NODE_ENV]

export default async (data) => {

  // Check user data
  if (!data.email || !data.name || !data.tokenSignupConfirmation) { return ({ success: false, data: null, error: 'Data missing' }) }

  // Set options
  let mailOptions

  let to = data.email
  let from = conf.sendgrid.fromEmail

  let subject = 'WebApi - Confirme seu endereço de e-mail'

  let plainText = 'Confirme seu endereço de e-mail'
  let htmlText = '<span>Confirme seu endereço de e-mail<span>'

  let templateId = conf.sendgrid.templates.signup_confirmation

  let name = data.name
  let url = conf.app.signup.urlEmailVerification + '?email=' + data.email + '&token=' + data.tokenSignupConfirmation

  // send method
  if (conf.sendgrid.useLocalTemplates) {
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
