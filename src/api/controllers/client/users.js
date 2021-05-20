import presenter from'@apiprst/client/users'

const showMe = (req, res, next) => {
  presenter.showMe(req.user.id)
    .then(result => res.status(result.httpStatusCode).json(result.data))
    .catch(err => next(err))
}

const updateMe = (req, res, next) => {
  presenter.updateMe(req.user.id, req.body)
    .then(result => res.status(result.httpStatusCode).json(result.data))
    .catch(err => next(err))
}

const deleteMe = (req, res, next) => {
  presenter.deleteMe(req.user.id)
    .then(result => res.status(result.httpStatusCode).json(result.data))
    .catch(err => next(err))
}

export default {
  showMe,
  updateMe,
  deleteMe
}