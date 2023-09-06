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
import { decodeLoginCookieToken, generateloginToken } from '../utils/jwt';

const BAD_LOGIN_MESSAGE = 'unauthorized';
dotenv.config();
const USER_FOUND_MESSAGE = 'user exists';

export const createUser: RequestHandler = async (req, res, next) => {
  const { username, password } = req.body;
  const formattedUsername = formattingUsername(username);
  const encryptedPassword = await encryptingPassword(password);
  await insertUser(formattedUsername, encryptedPassword);
  res.status(201).json(serverResponse('new user created'));
};

// האם צריך לבדוק את המידע שאני מקבל מהיוזר בנוסף לדטהבייס?
export const login: RequestHandler = async (req, res, next) => {
  const { username, password } = req.body;
  const formattedUsername = formattingUsername(username);
  const existingUser = await checkIfUserExist(formattedUsername);
  if (!existingUser) {
    next(new CustomError(401, BAD_LOGIN_MESSAGE));
    return;
  }
  const isPasswordMatch = await bcrypt.compare(
    password,
    existingUser.encrypted_password
  );
  if (!isPasswordMatch) {
    next(new CustomError(401, BAD_LOGIN_MESSAGE));
    return;
  }
  const loginToken = generateloginToken(formattedUsername);
  res.status(200).json(
    serverResponse(USER_FOUND_MESSAGE, {
      loginToken,
      formattedUsername,
    })
  );
};

export const checkUserCookie: RequestHandler = async (req, res, next) => {
  const token = req.headers?.authorization?.split(' ')[1];
  if (!token) {
    next(new CustomError(401, 'token missing'));
    return;
  }
  const username = decodeLoginCookieToken(token);
  if (!username) {
    next(new CustomError(401, BAD_LOGIN_MESSAGE));
    return;
  }
  res.status(200).json(serverResponse(USER_FOUND_MESSAGE, username));
};
