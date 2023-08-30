import dotenv from 'dotenv';
import { type RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import { checkIfUserExist, insertUser } from '../db/database';
import serverResponse from '../utils/serverResponse';
import {
  encryptingPassword,
  formattingUsername,
} from '../utils/data/functions';
import CustomError from '../errors/CustomError';

const BAD_LOGIN_MESSAGE = 'wrong username or password';
dotenv.config();
export const createUser: RequestHandler = async (req, res, next) => {
  const { username, password } = req.body;
  const formatedUsername = formattingUsername(username);
  const encryptedPassword = await encryptingPassword(password);
  await insertUser(formatedUsername, encryptedPassword);
  res.status(201).json(serverResponse('new user created'));
};
export const login: RequestHandler = async (req, res, next) => {
  const { username, password } = req.body;
  const formatedUsername = formattingUsername(username);
  const existingUser = await checkIfUserExist(formatedUsername);
  if (!existingUser) {
    throw new CustomError(400, BAD_LOGIN_MESSAGE);
  }
  const isPasswordMatch = await bcrypt.compare(
    password,
    existingUser.encrypted_password
  );
  if (!isPasswordMatch) {
    throw new CustomError(400, BAD_LOGIN_MESSAGE);
  }
  res.status(200).json(serverResponse('valid user', formatedUsername));
};
