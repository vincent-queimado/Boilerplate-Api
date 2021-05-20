import presenter from '@apiprst/admin/users'

const create = (req, res, next) => {
  presenter.create(req.body)
    .then(result => res.status(result.httpStatusCode).json(result.data))
    .catch(err => next(err))
}

const update = (req, res, next) => {
  presenter.update(req.params.id, req.body)
    .then(result => res.status(result.httpStatusCode).json(result.data))
    .catch(err => next(err))
}

const remove = (req, res, next) => {
  presenter.remove(req.params.id)
    .then(result => res.status(result.httpStatusCode).json(result.data))
    .catch(err => next(err))
}

const findAll = (req, res, next) => { 
  presenter.findAll(req.query)
    .then(result => res.status(result.httpStatusCode).json(result.data))
    .catch(err => next(err))
}

const findOne = (req, res, next) => {
  presenter.findOne(req.params.id)
    .then(result => res.status(result.httpStatusCode).json(result.data))
    .catch(err => next(err))
}

export default {
  create,
  update,
  remove,
  findAll,
  findOne
}