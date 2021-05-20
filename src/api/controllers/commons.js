import presenter from '@apiprst/commons'

const root = (req, res, next) => { 
  presenter.apiRoot(req.query)
    .then(result => {
      res.redirect(result)
    })
    .catch(err => next(err))
}

const info = (req, res, next) => {
  presenter.apiInfo(req.query)
    .then(result => res.status(result.httpStatusCode).json(result.data))
    .catch(err => next(err))
}
  
const version = (req, res, next) => {
  presenter.apiVersion(req.query)
    .then(result => res.status(result.httpStatusCode).json(result.data))
    .catch(err => next(err))
}

export default {
  root,
  info,
  version
}
