import db from '@apimods'

export default async (page, pageSize)=> {
  let admins = await db.Admin
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
    .catch(() => { return ({ success: false, data: null, error: 'Failed to find admins.' }) })
  
  let count = await db.Admin
    .count({ where: { deleted: false } })
    .then((data) => { return ({ success: true, data: data, error: null }) })
    .catch(() => { return ({ success: false, data: null, error: 'Failed to count admins.' }) })

  return ({ success: true, data: { admins: admins.data, count: count.data }, error: null })
}
