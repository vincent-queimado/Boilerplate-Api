
import express from 'express'
import auth from '@middlewares/auth/jwt'
import MidValid from '@middlewares/validations/joi'
import ctrlClientUsers from '@apictrl/client/users'
import ctrlClientUserAuth from '@apictrl/client/users_auth'

const router = express.Router()

// Client User Auth
router.post('/auth/signin', MidValid.signin, ctrlClientUserAuth.signin)
router.post('/auth/signup', ctrlClientUserAuth.signup)
router.get('/auth/signout', ctrlClientUserAuth.signout)
router.get('/auth/signup/confirmation', ctrlClientUserAuth.signupConfirm)

// Client User Forgot Password
router.post('/auth/forgotpassword/request', ctrlClientUserAuth.forgotPasswordRequest)
router.post('/auth/forgotpassword/reset', ctrlClientUserAuth.forgotPasswordReset)

// Client Me
router.get('/me/show', auth.jwt, ctrlClientUsers.showMe)
router.patch('/me/update', auth.jwt,  ctrlClientUsers.updateMe)
router.patch('/me/delete', auth.jwt, ctrlClientUsers.deleteMe)

export default router
