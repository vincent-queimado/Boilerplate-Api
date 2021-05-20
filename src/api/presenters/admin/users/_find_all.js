import httpMsg from '@utils/http_handler/http_msg'
import servFindAll from '@apiserv/client/users/_get_all'

const errCode = 'ERROR_ADMIN_FIND_ALL_USERS'

export default async (pagination) => {

  // Set default pagination
  const page = parseInt(pagination.page) || 1
  const pageSize = parseInt(pagination.per_page) || 10

  // Get all users
  const result = await servFindAll(page - 1, pageSize)
  if (!result.success || !result.data) { return (httpMsg.http422('Error to find users.', errCode)) }

  // Set total page
  let totalPage = Math.ceil(result.data.count / pageSize)

  return (httpMsg.http200({ users: result.data.users, pagination: { page: page, total_pages: totalPage, total_per_page: pageSize, total: result.data.count } }))
}
