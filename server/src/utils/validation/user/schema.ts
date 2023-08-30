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
  .min(8)
  .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
  .required()
  .messages({
    'string.base': 'Password should be a string',
    'string.empty': 'Password is required',
    'string.min': 'Password should be at least 8 characters',
    'any.required': 'Password is required',
    'string.pattern.base':
      'Password must contain at least one letter and one number',
  });

const userValidationScheme = {
  usernameCheck,
  passwordCheck,
};

export default userValidationScheme;
