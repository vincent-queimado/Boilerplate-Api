import cors from 'cors'
import colorTxt from 'ansi-colors'
import morgan from 'morgan'
import helmet from 'helmet'
import express from 'express'
import favicon from 'serve-favicon'
import session from 'express-session'
import cookieParser from 'cookie-parser'

import indexRouter from '@routes/index'
import clientRouter from '@routes/client'
import adminRouter from '@routes/admin'
import handleError from '@utils/http_handler/error_handler'

export default (env) => {
  // const router = express.Router()

  let app = express()

  if (env.conf.server.debug) { app.use(morgan('dev')) }

  app.use('/static', express.static('./public'))
  app.use(favicon('public/assets/images/favicons/favicon.ico'))
  
  app.use(helmet())
  app.use(cookieParser())

  app.use(express.urlencoded({ extended: false }))
  app.use(express.json())

  app.use(cors())

  app.use(session(env.conf.session))

  app.use('/', indexRouter)
  app.use(`/api/v${env.conf.api.version}/client/`, clientRouter)
  app.use(`/api/v${env.conf.api.version}/admin/`, adminRouter)

  app.get("*", (req, res, next) => {
    next({ 'error': 'NotFound' })
  })

  app.use(handleError)
  
  console.log(colorTxt.cyanBright('-> ' + env.labels.TXT_EXPRESS_UP))

  return app
}
