import httpMsg from '@utils/http_handler/http_msg'

const errCode = 'ERROR_FORGOT_PASSWORD_FORM'

export default async (data) => {
  // Check user data
  if (!data.email || !data.token) { return (httpMsg.http422('Data missing.', errCode)) }

  return (httpMsg.http200({ email: data.email, token: data.token }))
}