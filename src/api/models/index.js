import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'
import colorTxt from 'ansi-colors'
import labels from '@config/labels'
import config from '@config/database'
import logger from '@services/logging/winston/logger'

const conf = config[process.env.NODE_ENV || 'development']
const db = {}

const sequelize = new Sequelize(
  conf.database, 
  conf.username, 
  conf.password, 
  {
    host: conf.host,
    port: conf.port,
    dialect: conf.dialect,
    dialectOptions: conf.dialectOptions,
    pool: conf.pool,
    logging: conf.logging
  })

sequelize
  .authenticate()
  .then(() => {
      console.log(colorTxt.cyan(labels.TXT_DB_STATE) + ' ' + colorTxt.yellow(labels.TXT_DB_CON))
      logger.info(labels.TXT_DB_STATE + ' ' + labels.TXT_DB_CON)
  }, (error) =>{
      console.log(colorTxt.cyan(labels.TXT_DB_STATE) + ' ' + colorTxt.redBright(labels.TXT_DB_DES))
      logger.error(labels.TXT_DB_STATE + ' ' + labels.TXT_DB_DES + ' (' + error + ')')
  })


fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== path.basename(__filename)) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db