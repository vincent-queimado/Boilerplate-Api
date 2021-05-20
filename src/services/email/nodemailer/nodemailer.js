import nodemailer from 'nodemailer'
import configApp from 'src/config/app'
import configEmail from 'src/config/email'

const env = process.env.NODE_ENV || 'development'
const confApp = configApp[env]
const confEmail = configEmail[env]

let transporter = nodemailer.createTransport({
  
  service: confEmail.smtp_service,
  auth: {
    user: confEmail.smtp_user,
    pass: confEmail.smtp_password
  }
})


const registration = async function (name, email, subject, token) {
let link_redirect = ''
let link_img = ''

const uppercaseWords = str => str.replace(/^(.)|\s+(.)/g, c => c.toUpperCase())
name = uppercaseWords(name);

if (env == 'development'){
    link_redirect = 'http://' + confApp.server.host + ':' + confApp.server.port + '/signup_confirmation?email=' + email + '&token=' + token
    link_img = 'http://vps13485.publiccloud.com.br/ianua/assets/images/email-confirmation.png'
} else {
    link_redirect  = 'https://vps13485.publiccloud.com.br:3333/signup_confirmation?email=' + email + '&token=' + token
    link_img = 'https://vps13485.publiccloud.com.br/ianua/assets/images/email-confirmation.png'
}

  let mailOptions = {
    from: confEmail.smtp_user,
    to: email,
    subject: subject,
    // html: "<p>To confirm your registration, please follow the link below: </p><br><a href='" + link + "'>" + link + '</a>'
 html: `<!doctype html>
 <html>
   <head>
     <meta name="viewport" content="width=device-width">
     <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
     <title>Confirmação de cadastro</title>
     <style>

     @media only screen and (max-width: 620px) {
       table[class=body] h1 {
         font-size: 28px !important;
         margin-bottom: 10px !important;
       }
       table[class=body] p,
             table[class=body] ul,
             table[class=body] ol,
             table[class=body] td,
             table[class=body] span,
             table[class=body] a {
         font-size: 16px !important;
       }
       table[class=body] .wrapper,
             table[class=body] .article {
         padding: 10px !important;
       }
       table[class=body] .content {
         padding: 0 !important;
       }
       table[class=body] .container {
         padding: 0 !important;
         width: 100% !important;
       }
       table[class=body] .main {
         border-left-width: 0 !important;
         border-radius: 0 !important;
         border-right-width: 0 !important;
       }
       table[class=body] .btn table {
         width: 100% !important;
       }
       table[class=body] .btn a {
         width: 100% !important;
       }
       table[class=body] .img-responsive {
         height: auto !important;
         max-width: 100% !important;
         width: auto !important;
       }
     }
 
     /* -------------------------------------
         PRESERVE THESE STYLES IN THE HEAD
     ------------------------------------- */
     @media all {
       .ExternalClass {
         width: 100%;
       }
       .ExternalClass,
             .ExternalClass p,
             .ExternalClass span,
             .ExternalClass font,
             .ExternalClass td,
             .ExternalClass div {
         line-height: 100%;
       }
       .apple-link a {
         color: inherit !important;
         font-family: inherit !important;
         font-size: inherit !important;
         font-weight: inherit !important;
         line-height: inherit !important;
         text-decoration: none !important;
       }
       #MessageViewBody a {
         color: inherit;
         text-decoration: none;
         font-size: inherit;
         font-family: inherit;
         font-weight: inherit;
         line-height: inherit;
       }
       .btn-primary table td:hover {
         background-color: #34495e !important;
       }
       .btn-primary a:hover {
         background-color: #34495e !important;
         border-color: #34495e !important;
       }
     }
     </style>
   </head>
   <body class="" style="background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
     <table border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background-color: #f6f6f6;">
       <tr>
         <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
         <td class="container" style="margin-top: 10px; font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; max-width: 580px; padding: 10px; width: 580px;">
           <div class="content" style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 10px;">
 
             <!-- START CENTERED WHITE CONTAINER -->
             <span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;"></span>
             <table class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background: #ffffff; border-radius: 3px;">
 
               <!-- START MAIN CONTENT AREA -->
               <tr>
                 <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;">
                   
				   <div style="text-align: center; margin-bottom: 20px" class="col-md-12 m-b-20 text-center">
						<img style="height:100px" class="logo" src="${link_img}" alt="Web Api">
					</div>
					
				   <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
                     <tr>
                       <td style="text-align:center; font-family: sans-serif; font-size: 14px; vertical-align: top;">
                         <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;"> Olá, ${name}</p>
                         <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Você está quase lá! Para verificarmos que o seu e-mail é válido e finalizar seu cadastro, clique no botão abaixo.</p>
                         <table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; box-sizing: border-box;">
                           <tbody>
                             <tr>
                               <td align="center" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;">
                                 <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;">
                                   <tbody>
                                     <tr>
                                       <td style="font-family: sans-serif; font-size: 14px; vertical-align: top; background-color: #3498db; border-radius: 5px; text-align: center;"> 
                                        <center>
											<a href="${link_redirect}" target="_blank" role="button" style="display: inline-block; color: #ffffff; background-color: #3498db; border: solid 1px #3498db; border-radius: 5px; box-sizing: border-box; text-decoration: none; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-transform: capitalize; border-color: #3498db;">
											  Confirmar
											</a>
										</center>
                                       </td>
                                     </tr>
                                   </tbody>
                                 </table>
                               </td>
                             </tr>
                           </tbody>
                         </table>
                         <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Ao clicar no botão de confirmação, você será redirecionado para o site.</p>
                         <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Se você tiver qualquer problema com sua conta, por favor, não hesite em entrar em contato com nossa <a href="mailto:${confEmail.smtp_user}">equipe de suporte</a>.</p>
						 <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Obrigado!</p>
                       </td>
                     </tr>
                   </table>
                 </td>
               </tr>
 
             <!-- END MAIN CONTENT AREA -->
             </table>
 
             <!-- START FOOTER -->
             <div class="footer" style="clear: both; Margin-top: 10px; text-align: center; width: 100%;">
               <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
                 <tr>
                   <td class="content-block powered-by" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #999999; text-align: center;">
                     Time Web Api
                   </td>
                 </tr>
               </table>
             </div>
             <!-- END FOOTER -->
 
           <!-- END CENTERED WHITE CONTAINER -->
           </div>
         </td>
         <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
       </tr>
     </table>
   </body>
 </html>`
  }

  let mail = await wrapedSendMail(mailOptions)

  return mail
}

const resetPassword = async function (name, email, subject, token) {
  let link_redirect = ''
  let link_img = ''
  
  const uppercaseWords = str => str.replace(/^(.)|\s+(.)/g, c => c.toUpperCase())
  name = uppercaseWords(name);
  
  if (env == 'development'){
      link_redirect = 'http://' + confApp.server.host + ':' + confApp.server.port + '/reset_password?email=' + email + '&token=' + token
      link_img = 'http://vps13485.publiccloud.com.br/ianua/assets/images/reset-password.png'
  } else {
      link_redirect  = 'https://vps13485.publiccloud.com.br:3333/reset_password?email=' + email + '&token=' + token
      link_img = 'https://vps13485.publiccloud.com.br/assets/images/reset-password.png'
  }

  let mailOptions = {
    from: confEmail.smtp_user,
    to: email,
    subject: subject,
    html: `<!doctype html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Redefinir sua senha</title>
        <style>
   
        @media only screen and (max-width: 620px) {
          table[class=body] h1 {
            font-size: 28px !important;
            margin-bottom: 10px !important;
          }
          table[class=body] p,
                table[class=body] ul,
                table[class=body] ol,
                table[class=body] td,
                table[class=body] span,
                table[class=body] a {
            font-size: 16px !important;
          }
          table[class=body] .wrapper,
                table[class=body] .article {
            padding: 10px !important;
          }
          table[class=body] .content {
            padding: 0 !important;
          }
          table[class=body] .container {
            padding: 0 !important;
            width: 100% !important;
          }
          table[class=body] .main {
            border-left-width: 0 !important;
            border-radius: 0 !important;
            border-right-width: 0 !important;
          }
          table[class=body] .btn table {
            width: 100% !important;
          }
          table[class=body] .btn a {
            width: 100% !important;
          }
          table[class=body] .img-responsive {
            height: auto !important;
            max-width: 100% !important;
            width: auto !important;
          }
        }
    
        /* -------------------------------------
            PRESERVE THESE STYLES IN THE HEAD
        ------------------------------------- */
        @media all {
          .ExternalClass {
            width: 100%;
          }
          .ExternalClass,
                .ExternalClass p,
                .ExternalClass span,
                .ExternalClass font,
                .ExternalClass td,
                .ExternalClass div {
            line-height: 100%;
          }
          .apple-link a {
            color: inherit !important;
            font-family: inherit !important;
            font-size: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
            text-decoration: none !important;
          }
          #MessageViewBody a {
            color: inherit;
            text-decoration: none;
            font-size: inherit;
            font-family: inherit;
            font-weight: inherit;
            line-height: inherit;
          }
          .btn-primary table td:hover {
            background-color: #34495e !important;
          }
          .btn-primary a:hover {
            background-color: #34495e !important;
            border-color: #34495e !important;
          }
        }
        </style>
      </head>
      <body class="" style="background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
        <table border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background-color: #f6f6f6;">
          <tr>
            <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
            <td class="container" style="margin-top: 10px; font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; max-width: 580px; padding: 10px; width: 580px;">
              <div class="content" style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 10px;">
    
                <!-- START CENTERED WHITE CONTAINER -->
                <span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;"></span>
                <table class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background: #ffffff; border-radius: 3px;">
    
                  <!-- START MAIN CONTENT AREA -->
                  <tr>
                    <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;">
                      
              <div style="text-align: center; margin-bottom: 20px" class="col-md-12 m-b-20 text-center">
               <img style="height:100px" class="logo" src="${link_img}" alt="Web Api">
             </div>
             
              <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
                        <tr>
                          <td style="text-align:center; font-family: sans-serif; font-size: 14px; vertical-align: top;">
                            <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;"> Olá, ${name}</p>
                            <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Você solicitou a redefinição da sua senha de acesso ao portal Web Api. Clique no botão abaixo para redefinir sua senha.</p>
                            <table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; box-sizing: border-box;">
                              <tbody>
                                <tr>
                                  <td align="center" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;">
                                    <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;">
                                      <tbody>
                                        <tr>
                                          <td style="font-family: sans-serif; font-size: 14px; vertical-align: top; background-color: #3498db; border-radius: 5px; text-align: center;"> 
                                           <center>
                         <a href="${link_redirect}" target="_blank" role="button" style="display: inline-block; color: #ffffff; background-color: #3498db; border: solid 1px #3498db; border-radius: 5px; box-sizing: border-box; text-decoration: none; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-transform: capitalize; border-color: #3498db;">
                           Continuar
                         </a>
                       </center>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Ao clicar no botão, você será redirecionado para a pagina de redefinição da sua senha.</p>
                            <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Se você tiver qualquer problema com sua conta, por favor, não hesite em entrar em contato com nossa <a href="mailto:${confEmail.smtp_user}">equipe de suporte</a>.</p>
                <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Obrigado!</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
    
                <!-- END MAIN CONTENT AREA -->
                </table>
    
                <!-- START FOOTER -->
                <div class="footer" style="clear: both; Margin-top: 10px; text-align: center; width: 100%;">
                  <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
                    <tr>
                      <td class="content-block powered-by" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #999999; text-align: center;">
                        Time Web Api
                      </td>
                    </tr>
                  </table>
                </div>
                <!-- END FOOTER -->
    
              <!-- END CENTERED WHITE CONTAINER -->
              </div>
            </td>
            <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
          </tr>
        </table>
      </body>
    </html>`
  }

  let mail = await wrapedSendMail(mailOptions)

  return mail
}

async function wrapedSendMail (mailOptions) {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error)
        resolve(false)
      } else {
        console.log(info.response)
        resolve(true)
      }
    })
  })
}

export default {
  registration: registration,
  resetPassword: resetPassword
}
