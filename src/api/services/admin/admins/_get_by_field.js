import db from '@apimods'

export default (data, dataBy, excludeFields, findDeleted) => {
let options = {}

if (dataBy === 'id'){
  if (findDeleted) {
    options = { where: { id: data },       
      attributes: {
        exclude: excludeFields
      } 
    }
  } else {
    options = { where: { id: data, deleted: false},       
      attributes: {
        exclude: excludeFields
      } 
    }
  }
} else if (dataBy === 'email'){
  if (findDeleted) {
    options = { where: { email: data },       
      attributes: {
        exclude: excludeFields
      } 
    }
  } else {
    options = { where: { email: data, deleted: false},       
      attributes: {
        exclude: excludeFields
      } 
    }
  }
} else {
  return ({ success: false, data: null, error: 'Failed to find by field.' })
}

return db.Admin
  .findOne(options)
    .then((result) => { return ({ success: true, data: result, error: null }) })
    .catch((error) => { console.log(error); return ({ success: false, data: null, error: 'Failed to find.' }) })
}
