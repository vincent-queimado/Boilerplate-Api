import db from '@apimods'

export default async (page, pageSize)=> {
  let users = await db.User
    .findAll({
      offset: page * pageSize,
      limit: pageSize,
      order: [['name', 'ASC']],
      attributes: {
        exclude: ['password', 'tokenResetPassword', 'tokenSignupConfirmation', 'deleted']
      },
      where: { deleted: false }
    })
    .then((result) => { return ({ success: true, data: result, error: null }) })
    .catch(() => { return ({ success: false, data: null, error: 'Failed to find users.' }) })
  
  let count = await db.User
    .count({ where: { deleted: false } })
    .then((data) => { return ({ success: true, data: data, error: null }) })
    .catch(() => { return ({ success: false, data: null, error: 'Failed to count users.' }) })

  return ({ success: true, data: { users: users.data, count: count.data }, error: null })
}
