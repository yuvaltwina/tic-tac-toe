import Joi from 'joi';
import { type RequestHandler } from 'express';
import CustomError from '../../../errors/CustomError';
import userValidationScheme from './schema';

export const newUserValidation: RequestHandler = (req, res, next) => {
  const { username, password } = req.body;
  const newUser = { username, password };
  const { passwordCheck, usernameCheck } = userValidationScheme;
  const { error } = Joi.object({
    password: passwordCheck,
    username: usernameCheck,
  }).validate(newUser);
  if (error) {
    next(new CustomError(400, error.message));
    return;
  }
  next();
};
export const g = 5;
