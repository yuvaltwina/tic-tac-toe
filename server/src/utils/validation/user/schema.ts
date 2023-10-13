import Joi from 'joi';

const usernameValidation = Joi.string()
  .required()
  .min(3)
  .max(11)
  .pattern(/^[a-zA-Z][a-zA-Z0-9]*$/)
  .messages({
    'string.min': 'Password should be at least 3 characters',
    'string.max': 'Password should not exceed 11 characters',
    'string.base': 'Username should be a string',
    'string.empty': 'Username is required',
    'string.pattern.base':
      'Username should start with a letter and contain only letters and numbers',
    'any.required': 'Username is required',
  });
const passwordValidation = Joi.string()
  .required()
  .min(6)
  .max(30)
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]/)
  .messages({
    'string.base': 'Password should be a string',
    'string.empty': 'Password is required',
    'string.min': 'Password should be at least 6 characters',
    'string.max': 'Password should not exceed 30 characters',
    'any.required': 'Password is required',
    'string.pattern.base':
      'Password  should include both uppercase and lowercase letters and at least one digit',
  });
const pointsValidation = Joi.number().required().messages({
  'number.base': 'Points should be a number',
  'any.required': 'Points is required',
});
const imageIdValidation = Joi.number().required().valid(1, 2, 3, 4).messages({
  'number.base': 'Points should be a number',
  'any.required': 'Points is required',
  'any.only': 'Points must be 1, 2, 3, or 4',
});
const userValidationScheme = {
  usernameValidation,
  passwordValidation,
  pointsValidation,
  imageIdValidation,
};

export default userValidationScheme;
