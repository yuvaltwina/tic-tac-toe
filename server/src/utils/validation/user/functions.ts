import Joi from 'joi';
import { type RequestHandler } from 'express';
import CustomError from '../../../errors/CustomError';
import userValidationScheme from './schema';
import { decodeLoginToken } from '../../jwt';

export const newUserValidation: RequestHandler = (req, res, next) => {
  const { username, password } = req.body;
  const newUser = { username, password };
  const { passwordValidation, usernameValidation } = userValidationScheme;
  const { error } = Joi.object({
    password: passwordValidation,
    username: usernameValidation,
  }).validate(newUser);
  if (error) {
    next(new CustomError(400, error.message));
    return;
  }
  next();
};
export const userCookieValidtion: RequestHandler = (req, res, next) => {
  const token = req.headers?.authorization?.split(' ')[1];
  if (!token) {
    return next(new CustomError(401, 'token missing'));
  }
  const username = decodeLoginToken(token);
  if (!username) {
    return next(new CustomError(401, 'unauthorized'));
  }
  req.body.username = username;
  next();
  return;
};
export default newUserValidation;
