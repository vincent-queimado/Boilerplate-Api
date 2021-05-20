export default {
  http200: function (data) {
    const params = { success: true, message: 'Has been successfully done.', content: data || null }
    return ({ httpStatusCode: 200, data: params })
  },
  http201: function (data) {
    const params = { success: true, message: 'Has been successfully created.', content: data || null }
    return ({ httpStatusCode: 201, data: params })
  },
  http401: function (error) {
    const params = { success: false, message: 'Unauthorized access.', error: error || null }
    return ({ httpStatusCode: 401, data: params })
  },
  http422: function (customMsg, error) {
    const params = { success: false, message: customMsg || 'Failed.', error: error || null }
    return ({ httpStatusCode: 422, data: params })
  }
}
