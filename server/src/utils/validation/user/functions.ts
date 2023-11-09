import Joi from 'joi';
import { type RequestHandler } from 'express';
import CustomError from '../../../errors/CustomError';
import userValidationScheme from './schema';
import { decodeLoginToken } from '../../jwt';
import { type ImageId } from '../../types/types';

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
    next(new CustomError(401, 'token missing')); return;
  }
  const username = decodeLoginToken(token);
  if (!username) {
    next(new CustomError(401, 'unauthorized'));
    return;
  }
  req.body.username = username;
  next();
};
export default newUserValidation;

export const imageIdValidation = (imageId: ImageId) => {
  const { imageIdValidation } = userValidationScheme;

  const { error } = imageIdValidation.validate(imageId);
  if (error) {
   return false
  }

return true
}
