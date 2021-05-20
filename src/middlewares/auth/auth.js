const presenter = require('@middlewares/auth/jwt')

exports.jwt = (req, res, next) => {
  presenter.jwt(req)
    .then(result => {
      if(!result.success){
        res.status(result.httpStatusCode).json(result.data)
      } else {
        req.user = result.data
        next()
      }
    })
    .catch(err => next(err))
}
