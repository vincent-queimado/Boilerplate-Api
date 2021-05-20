import moment from 'moment'
import clrTxt from 'ansi-colors'

import pkg from '@package'
import config from '@config/app'
import labels from '@config/labels'
import logger from '@services/logging/winston/logger'

export default () => {
  const conf = config[process.env.NODE_ENV || 'development']
 
  console.log(clrTxt.bgWhite.black(`\n ${labels.TXT_APP_STARTING} ${conf.app.name} ` + clrTxt.bgMagenta.black(` v ${pkg.version} `) ))
  console.log(clrTxt.cyanBright(`-> ${labels.TXT_APP_RUNNING} ${process.env.NODE_ENV || 'Development (Unset)'} ${labels.TXT_APP_ENVIRONMENT}`))
  console.log(clrTxt.cyanBright(`-> ${labels.TXT_APP_START_AT} ${moment().format('YYYY-MM-DD HH:mm')}`))

  logger.info(labels.TXT_APP_STARTING + ' ' + conf.app.name + ' (v' + pkg.version + ')')
  
  return { conf, labels }
}
