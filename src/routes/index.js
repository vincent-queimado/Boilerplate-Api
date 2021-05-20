import express from 'express'
import config from '@config/app'
import CtrlCommons from '@apictrl/commons'
import CtrlMocks from '@apictrl/mocks'

const router = express.Router()
const conf = config[process.env.NODE_ENV || 'development']

// Cors Settings
router.all('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  next()
})

// Root Url Redirect
router.get('/', CtrlCommons.root)
router.get('/api', CtrlCommons.root)
router.get(`/api/v${conf.api.version}`, CtrlCommons.root)

// API Info
router.get(`/api/v${conf.api.version}/info`, CtrlCommons.info)

// API Version
router.get(`/api/v${conf.api.version}/version`, CtrlCommons.version)

// Urls Mockup
router.get(`/api/v${conf.api.version}/mocks/welcome`, CtrlMocks.welcome)
router.get(`/api/v${conf.api.version}/mocks/forgotpassword/form`, CtrlMocks.forgotPasswordForm)

export default router
