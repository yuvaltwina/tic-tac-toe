import bcrypt from 'bcrypt';
import { RequestHandler } from 'express';

export const formattingUsername = (username: string) => {
  const loweredCaseUsername = username.toLocaleLowerCase();
  const formattedUsername =
    loweredCaseUsername[0].toUpperCase() + loweredCaseUsername.slice(1);
  return formattedUsername;
};

export const encryptingPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(password, salt);
  return encryptedPassword;
};
export const errorWrapper =
  (cb: any): RequestHandler =>
  (req, res, next) =>
    cb(req, res, next).catch(next);
