import Joi from '@hapi/joi'

export const signup = Joi
  .object({
    name: Joi
    .string()
    .regex(/^[A-Za-z0-9\s]*$/)
    .min(2)
    .max(64)
    .required()
    .messages({
      'string.pattern.base': `Opa! digite um nome válido e tente novamente.`,
      'string.empty': `Opa! digite seu nome e tente novamente.`,
      'string.min': `Opa! seu nome deve conter no mínimo {#limit} caracteres.`,
      'string.max': `Opa! seu nome deve conter no máximo {#limit} caracteres.`,
      'any.required': `Opa! digite seu nome e tente novamente.`
    }),
    email: Joi
    .string()
    .email()
    .max(128)
    .required()
    .messages({
      'string.email': `Opa! parece que esse e-mail é inválido. Por favor, tente novamente.`,
      'string.empty': `Opa! digite seu e-mail e tente novamente!`,
      'string.max': `Opa! seu e-mail deve conter no mínimo {#limit} caracteres.`,
      'any.required': `Opa! digite seu e-mail e tente novamente!`
    }),
    password: Joi
    .string()
    .regex(/^[A-Za-z0-9!@#$%&]*$/)
    .min(6)
    .max(16)
    .required()
    .messages({
      'string.empty': `Opa! digite sua senha e tente novamente!`,
      'string.pattern.base': `Opa! parece que sua senha é inválida!`,
      'string.min': `Opa! sua senha deve conter no mínimo {#limit} caracteres!`,
      'string.max': `Opa! sua senha deve conter no máximo {#limit} caracteres!`,
      'any.required': `Opa! digite sua senha e tente novamente!`
    }),
    confirmPassword: Joi
    .string()
    .regex(/^[A-Za-z0-9!@#$%&]*$/)
    .min(6)
    .max(16)
    .required()
    .messages({
      'string.empty': `Opa! digite sua senha e tente novamente!`,
      'string.pattern.base': `Opa! parece que sua senha é inválida!`,
      'string.min': `Opa! sua senha deve conter no mínimo {#limit} caracteres!`,
      'string.max': `Opa! sua senha deve conter no máximo {#limit} caracteres!`,
      'any.required': `Opa! digite sua senha e tente novamente!`
      }),
    // phone: Joi
    // .number()
    // .min(10)
    // .max(11)
    // .messages({
    //   'number.base': `Phone number should be a type of number`,
    //   'number.integer': `Phone number is not a valid number`,
    //   'number.empty': `Phone number cannot be an empty field`,
    //   'number.min': `Phone number should have a minimum length of {#limit}`,
    //   'number.max': `Phone number should have a maximum length of {#limit}`
    // })
  })
  .messages({
    'object.unknown': '{{#label}} parameter is not allowed here!'
  })
  .with('name', 'email')

export const signin = Joi
  .object({
    email: Joi
    .string()
    .email()
    .max(128)
    .required()
    .messages({
      'string.email': `Opa, parece que esse e-mail é inválido!`,
      'string.empty': `Opa, digite seu e-mail e tenta novamente!`,
      'string.max': `Opa, seu e-mail deve conter no mínimo {#limit} caracteres!`,
      'any.required': `Opa, digite seu e-mail e tenta novamente!`
    }),
    password: Joi
    .string()
    .regex(/^[A-Za-z0-9!@#$%&]*$/)
    .min(6)
    .max(16)
    .required()
    .messages({
      'string.empty': `Opa, digite sua senha e tenta novamente!`,
      'string.pattern.base': `Opa, parece que sua senha é inválida!`,
      'string.min': `Opa, sua senha deve conter no mínimo {#limit} caracteres!`,
      'string.max': `Opa, sua senha deve conter no máximo {#limit} caracteres!`,
      'any.required': `Opa, digite sua senha e tenta novamente!`
    })
  })
  .messages({
    'object.unknown': '{{#label}} parameter is not allowed here!'
  })
  .with('email', 'password')

  export const signupConfirmation = Joi
  .object({
    email: Joi
    .string()
    .email()
    .max(128)
    .required()
    .messages({
      'string.email': `Opa! parece que esse e-mail é inválido. Por favor, tente novamente.`,
      'string.empty': `Opa! digite seu e-mail e tente novamente!`,
      'string.max': `Opa! seu e-mail deve conter no mínimo {#limit} caracteres.`,
      'any.required': `Opa! digite seu e-mail e tente novamente!`
    }),
    token: Joi
    .string()
    .required()
    .messages({
      'string.empty': `Opa! erro ao identificar a solicitação.`,
      'any.required': `Opa! erro ao identificar a solicitação.`
    })
  })
  .messages({
    'object.unknown': '{{#label}} parameter is not allowed here'
  })
  .with('email', 'token')

const forgotPassword = Joi
  .object({
    email: Joi
    .string()
    .email()
    .max(128)
    .required()
    .messages({
      'string.email': `Opa! parece que esse e-mail é inválido. Por favor, tente novamente.`,
      'string.empty': `Opa! digite seu e-mail e tente novamente!`,
      'string.max': `Opa! seu e-mail deve conter no mínimo {#limit} caracteres.`,
      'any.required': `Opa! digite seu e-mail e tente novamente!`
    })
  })
  .messages({
    'object.unknown': '{{#label}} parameter is not allowed here!'
  })

  const resetPassword = Joi
  .object({
    email: Joi
    .string()
    .email()
    .max(128)
    .required()
    .messages({
      'string.email': `Opa! parece que esse e-mail é inválido. Por favor, tente novamente.`,
      'string.empty': `Opa! digite seu e-mail e tente novamente!`,
      'string.max': `Opa! seu e-mail deve conter no mínimo {#limit} caracteres.`,
      'any.required': `Opa! digite seu e-mail e tente novamente!`
    }),
    token: Joi
    .string()
    .required()
    .messages({
      'string.empty': `Opa! erro ao identificar a solicitação.`,
      'any.required': `Opa! erro ao identificar a solicitação.`
    }),
    password: Joi
    .string()
    .regex(/^[A-Za-z0-9!@#$%&]*$/)
    .min(6)
    .max(16)
    .required()
    .messages({
      'string.empty': `Opa! digite sua senha e tente novamente!`,
      'string.pattern.base': `Opa! parece que sua senha é inválida!`,
      'string.min': `Opa! sua senha deve conter no mínimo {#limit} caracteres!`,
      'string.max': `Opa! sua senha deve conter no máximo {#limit} caracteres!`,
      'any.required': `Opa! digite sua senha e tente novamente!`
    }),
    confirmPassword: Joi
    .string()
    .regex(/^[A-Za-z0-9!@#$%&]*$/)
    .min(6)
    .max(16)
    .required()
    .messages({
      'string.empty': `Opa! digite sua senha e tente novamente!`,
      'string.pattern.base': `Opa! parece que sua senha é inválida!`,
      'string.min': `Opa! sua senha deve conter no mínimo {#limit} caracteres!`,
      'string.max': `Opa! sua senha deve conter no máximo {#limit} caracteres!`,
      'any.required': `Opa! digite sua senha e tente novamente!`
      }),
  })
  .messages({
    'object.unknown': '{{#label}} parameter is not allowed here!'
  })

  export default {
    signup,
    signin,
    signupConfirmation,
    forgotPassword,
    resetPassword
  }