import httpMsg from '@utils/http_handler/http_msg'
import apiVersion from '@apiserv/commons/_api_version'

export default async () => {
  let result = await apiVersion()

  if (!result.success || !result.data) { return (httpMsg.http422('Error to load version.')) }

  return (httpMsg.http200(result.data))
}

