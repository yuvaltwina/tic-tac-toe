import Joi from 'joi';

const usernameCheck = Joi.string()
  .pattern(/^[a-zA-Z][a-zA-Z0-9]{3,11}$/)
  .required()
  .messages({
    'string.base': 'Username should be a string',
    'string.empty': 'Username is required',
    'string.pattern.base':
      'Username should start with a letter and contain only letters and numbers (3-11 characters)',
    'any.required': 'Username is required',
  });
const passwordCheck = Joi.string()
  .min(6)
  .max(30)
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]/)
  .required()
  .messages({
    'string.base': 'Password should be a string',
    'string.empty': 'Password is required',
    'string.min': 'Password should be at least 6 characters',
    'string.max': 'Password should not exceed 30 characters',
    'any.required': 'Password is required',
    'string.pattern.base':
      'Password  should include both uppercase and lowercase letters and at least one digit',
  });

const userValidationScheme = {
  usernameCheck,
  passwordCheck,
};

export default userValidationScheme;
