import fs from 'fs'
import configApp from '@config/app'
import configEmail from '@config/email'
import sendgrid from '@services/email/sendgrid/core/sendgrid'
import htmlMsg from '@services/email/templates/email-verification.html'

const confEmail = configEmail[process.env.NODE_ENV]
const confApp = configApp[process.env.NODE_ENV]

export default async (data) => {
  // Check user data
  if (!data.email || !data.name || !data.tokenSignupConfirmation) { return ({ success: false, data: null, error: 'Data missing' }) }

  // Set options
  let mailOptions

  let to = data.email
  let from = confEmail.sendgrid.fromEmail

  let subject = 'WebApi - Confirme seu endereço de e-mail'

  let plainText = 'Confirme seu endereço de e-mail'
  let htmlText = '<span>Confirme seu endereço de e-mail<span>'

  let templateId = confEmail.sendgrid.templates.signup_confirmation

  let name = data.name
  let url = 'http://' + confApp.server.host + ':' + confApp.server.port + '/api/v1/client/auth/signup/confirmation/' + '?email=' + data.email + '&token=' + data.tokenSignupConfirmation

  const uppercaseWords = str => str.replace(/^(.)|\s+(.)/g, c => c.toUpperCase())
  name = name.split(" ")[0]
  name = uppercaseWords(name)

  console.log(url)
  // Send method
  if (confEmail.sendgrid.useLocalTemplates) {
    // htmlText = fs.readFileSync(htmlMsg, {encoding:'utf-8'}).toString()
    htmlText = htmlMsg
    htmlText = htmlText.replace('{{name}}', name)
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
  // let sendResult = await sendgrid(mailOptions)
  // if (!sendResult.success) { return ({ success: false, data: null, error: sendResult.error }) }
 
  // Success return
  return ({ success: true, data: sendResult.data, error: null })
}
