import presenter from '@apiprst/mocks'

const welcome = (req, res, next) => {
  presenter.welcome(req.body)
    .then(result => res.status(result.httpStatusCode).json(result.data))
    .catch(err => next(err))
}

const forgotPasswordForm = (req, res, next) => {
  presenter.forgotPasswordForm(req.query)
    .then(result => res.status(result.httpStatusCode).json(result.data))
    .catch(err => next(err))
}

export default {
  welcome,
  forgotPasswordForm
}