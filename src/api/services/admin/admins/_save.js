import db from '@apimods'
import Sequelize from 'sequelize'

export default (datas) => {
  return db.Admin
    .create(datas)
    .then((result) => { return ({ success: true, data: result, error: null }) })
    .catch(Sequelize.ValidationError, function (error) { return ({ success: false, data: null, error: error.errors[0].message }) })
    .catch(() => { return ({ success: false, data: null, error: 'Failed to create.' }) })
}