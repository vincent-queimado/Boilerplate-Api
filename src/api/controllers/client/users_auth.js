import presenter from '@apiprst/client/users_auth'

const signin = (req, res, next) => {
  presenter.signin(req.body)
    .then(result => res.status(result.httpStatusCode).json(result.data))
    .catch(err => next(err))
}

const signout = (req, res, next) => {
  presenter.signout(req.body)
    .then(result => res.status(result.httpStatusCode).json(result.data))
    .catch(err => next(err))
}

const signup = (req, res, next) => {
  console.log("client signup")
  presenter.signup(req.body)
    .then(result => res.status(result.httpStatusCode).json(result.data))
    .catch(err => next(err))
}

const signupConfirm = (req, res, next) => {
  console.log("client signup")
  presenter.signupConfirm(req.query)
    .then(result => res.status(result.httpStatusCode).json(result.data))
    .catch(err => next(err))
}

const forgotPasswordRequest = (req, res, next) => {
  presenter.forgotPasswordRequest(req.body)
    .then(result => res.status(result.httpStatusCode).json(result.data))
    .catch(err => next(err))
}

const forgotPasswordReset = (req, res, next) => {
  presenter.forgotPasswordReset(req.body)
    .then(result => res.status(result.httpStatusCode).json(result.data))
    .catch(err => next(err))
}

export default {
  signin,
  signout,
  signup,
  signupConfirm,
  forgotPasswordRequest,
  forgotPasswordReset
}