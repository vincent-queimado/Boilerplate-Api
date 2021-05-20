import httpMsg from '@utils/http_handler/http_msg'
import servFindAll from '@apiserv/admin/admins/_get_all'

const errCode = 'ERROR_ADMIN_FIND_ALL_ADMINS'

export default async (pagination) => {
  // Set default pagination
  const page = parseInt(pagination.page) || 1
  const pageSize = parseInt(pagination.per_size) || 10

  // Get all admins
  const result = await servFindAll(page - 1, pageSize)
  if (!result.success || !result.data) { return (httpMsg.http422('Error to find admins.', errCode)) }

  // Set total page
  let totalPage = Math.ceil(result.data.count / pageSize)

  return (httpMsg.http200({ admins: result.data.admins, pagination: { page: page, total_pages: totalPage, total_per_page: pageSize, total: result.data.count } }))
}
