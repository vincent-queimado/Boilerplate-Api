import sendgridMail from '@sendgrid/mail'
import config from '@config/email'

const conf = config[process.env.NODE_ENV]

export default async (mailOptions) => {

  sendgridMail.setApiKey(conf.sendgrid.key)

  let send = await sendgridMail
    .send(mailOptions)
    .then((result) => { return ({ success: true, data: result.result, error: null }) })
    .catch((error) => {
      if (error.response) {
        console.error(error.response.body)
      }
      return ({ success: false, data: null, error: error })   
    }) 
  
  if (!send.success) { return ({ success: false, data: null, error: send.error }) }
  
  return ({ success: true, data: send.result, error: null })
}
