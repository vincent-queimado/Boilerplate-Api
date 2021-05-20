import schemas from '@middlewares/validations/joi/_schemas'

const joi_options = {
    abortEarly: false, 
    errors: {
        wrap: { 
            label: false 
        } 
    }
}

const signin = async (req, res, next) => {
    const { error } = await schemas.signin.validate(req.body, joi_options)
    if (error) res.status(401).json({success: false, message: 'Unauthorized access.', error: error.details[0].message})
    next()
}


export default {
    signin
}
