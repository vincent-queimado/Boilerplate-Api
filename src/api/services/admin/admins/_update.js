import db from '@apimods'
import Sequelize from 'sequelize'

export default async (id, data) => {
  const admin = await db.Admin
    .update(data, {
      where: { id },
      returning: true
    })
    .then((data) => { return ({ success: true, data: data, error: null }) })
    .catch(Sequelize.ValidationError, function (error) { 
      console.log('DB Validation Error: ' + error.errors[0].message); 
      if (error.errors[0].type === 'unique violation') {
        return ({ success: false, data: null, error: 'USER_ALREADY_EXIST'}) 
      } else {
        return ({ success: false, data: null, error: 'DB_VALIDATION_ERROR'}) 
      }
    })
    .catch((error) => { 
      console.log('DB Query Error: ' + error); 
      return ({ success: false, data: null, error: 'DB_QUERY_ERROR' }) 
    })

    return admin
}
