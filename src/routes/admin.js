import express from 'express'
import MidAuthJwt from '@middlewares/auth/jwt'
import MidValid from '@middlewares/validations/joi'
import CtrlCommons from '@apictrl/commons'
import CtrlUsers from '@apictrl/admin/users'
import CtrlAdmins from '@apictrl/admin/admins'
import CtrlAdminAuth from '@apictrl/admin/admins_auth'

const router = express.Router()

// API Info Version
router.get(`/info`, CtrlCommons.info)
router.get(`/version`, CtrlCommons.version)

// Admin Authenticate 
router.post('/auth/signin', MidValid.signin, CtrlAdminAuth.signin)
router.get('/auth/signout', CtrlAdminAuth.signout)
router.post('/auth/signup', CtrlAdminAuth.signup)
router.get('/auth/signup/confirmation', CtrlAdminAuth.signupConfirm)

// Admin Forgot Password
router.post('/auth/forgotpassword/request', CtrlAdminAuth.forgotPasswordRequest)
router.post('/auth/forgotpassword/reset', CtrlAdminAuth.forgotPasswordReset)

// Admin CRUD
router.post('/admins', CtrlAdmins.create)
router.get('/admins', CtrlAdmins.findAll)
router.get('/admins/:id', CtrlAdmins.findOne)
router.patch('/admins/:id', CtrlAdmins.update)
router.patch('/admins/delete/:id', CtrlAdmins.remove)

// Users CRUD
router.post('/users', CtrlUsers.create)
router.get('/users', CtrlUsers.findAll)
router.get('/users/:id', CtrlUsers.findOne)
router.patch('/users/:id', CtrlUsers.update)
router.patch('/users/delete/:id', CtrlUsers.remove)

export default router
