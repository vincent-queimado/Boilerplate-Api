import fs from 'fs'
import configApp from '@config/app'
import configEmail from '@config/email'
import sendgrid from '@services/email/sendgrid/core/sendgrid'
import htmlMsg from '@services/email/templates/welcome.html'

const confEmail = configEmail[process.env.NODE_ENV]
const confApp = configApp[process.env.NODE_ENV]

export default async (data) => {
  // Check user data
  if (!data.email || !data.name) { return ({ success: false, data: null, error: 'Data missing' }) }

  // Set options
  let mailOptions

  let to = data.email
  let from = confEmail.sendgrid.fromEmail

  let subject = 'WebApi - Seja bem-vindo(a)'

  let plainText = 'Seja bem-vindo(a)'
  let htmlText = '<span>Seja bem-vindo(a)<span>'

  let templateId = confEmail.sendgrid.templates.welcome

  let name = data.name
  let url = confApp.app.signup.urlEmailVerification + '?email=' + data.email + '&token=' + data.tokenSignupConfirmation

  const uppercaseWords = str => str.replace(/^(.)|\s+(.)/g, c => c.toUpperCase())
  name = name.split(" ")[0]
  name = uppercaseWords(name)

  // Send method
  if (confEmail.sendgrid.useLocalTemplates) {
    htmlText = fs.readFileSync(htmlMsg, {encoding:'utf-8'}).toString()
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
  let sendResult = await sendgrid(mailOptions)
  if (!sendResult.success) { return ({ success: false, data: null, error: sendResult.error }) }

  // Success return
  return ({ success: true, data: sendResult.data, error: null })
}
