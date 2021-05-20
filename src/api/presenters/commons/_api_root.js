import httpMsg from '@utils/http_handler/http_msg'
import apiRoot from '@apiserv/commons/_api_root'

export default async () => {
  let result = await apiRoot()

  if (!result.success || !result.data) { return (httpMsg.http422('Error to load root path.')) }
  console.log(result.data)
  return (result.data)
}
