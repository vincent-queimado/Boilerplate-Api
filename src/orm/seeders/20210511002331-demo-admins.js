'use strict'
const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcryptjs')
const config = require('./../../config/app')

module.exports = {
  up: async (queryInterface, Sequelize) =>  {
    const conf = config.default[process.env.NODE_ENV || 'development']

    let id = await uuidv4()
    let name = 'Super Admin'
    let email = conf.superadmin.email
    let password = bcrypt.hashSync(conf.superadmin.password, 10)

    return await queryInterface.bulkInsert('Admins', [{
      id,
      name,
      email,
      password,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Admins', null, {});
  }
};
