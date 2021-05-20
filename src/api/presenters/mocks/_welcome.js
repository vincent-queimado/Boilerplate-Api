import httpMsg from '@utils/http_handler/http_msg'

export default async (data) => {
  return (httpMsg.http200({ email: data.email, token: data.name }))
}