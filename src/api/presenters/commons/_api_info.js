import httpMsg from '@utils/http_handler/http_msg'
import apiInfo from '@apiserv/commons/_api_info'

export default async () => {
  let result = await apiInfo()

  if (!result.success || !result.data) { return (httpMsg.http422('Error to load informations.')) }

  return (httpMsg.http200(result.data))
}
