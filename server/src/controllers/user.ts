import dotenv from 'dotenv';
import { type RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import {
  checkIfUserExist,
  getTopPointsUsersFromDB,
  insertUser,
  updateUserImage,
} from '../db/database';
import serverResponse from '../utils/serverResponse';
import {
  encryptingPassword,
  formattingUsername,
} from '../utils/data/functions';
import CustomError from '../errors/CustomError';
import { decodeLoginToken, generateLoginToken } from '../utils/jwt';
import { imageIdValidation } from '../utils/validation/user/functions';

const USER_ALREADY_LOGGED_MESSAGE = 'user is already logged in';
const BAD_LOGIN_MESSAGE = 'unauthorized';
const USER_FOUND_MESSAGE = 'user exists';
dotenv.config();

export const createUser: RequestHandler = async (req, res, next) => {
  const { username, password } = req.body;
  const formattedUsername = formattingUsername(username);
  const encryptedPassword = await encryptingPassword(password);
  await insertUser(formattedUsername, encryptedPassword);

  res.status(201).json(serverResponse('new user created'));
};

export const login: RequestHandler = async (req, res, next) => {
  const { username, password } = req.body;
  const formattedUsername = formattingUsername(username);
  const existingUser = await checkIfUserExist(formattedUsername);
  if (!existingUser) {
    next(new CustomError(400, BAD_LOGIN_MESSAGE));
    return;
  }
  const { encrypted_password, is_logged_in } = existingUser;
  const isPasswordMatch = await bcrypt.compare(password, encrypted_password);
  if (!isPasswordMatch) {
    next(new CustomError(400, BAD_LOGIN_MESSAGE));
    return;
  }
  if (is_logged_in) {
    next(new CustomError(400, USER_ALREADY_LOGGED_MESSAGE));
    return;
  }

  const { user_id, username: existUserName, points, image_id } = existingUser;
  const loginTokenData = {
    userId: user_id,
    username: existUserName,
    points,
    imageId: image_id,
  };

  const loginToken = generateLoginToken(loginTokenData);
  res.status(200).json(
    serverResponse(USER_FOUND_MESSAGE, {
      loginToken,
    })
  );
};

export const checkUserCookie: RequestHandler = async (req, res, next) => {
  const token = req.headers?.authorization?.split(' ')[1];
  if (!token) {
    next(new CustomError(401, 'token missing'));
    return;
  }
  const username = decodeLoginToken(token);
  if (!username) {
    next(new CustomError(401, BAD_LOGIN_MESSAGE));
    return;
  }
  res.status(200).json(serverResponse(USER_FOUND_MESSAGE, username));
};
export const getTopPointsUsers: RequestHandler = async (req, res, next) => {
  try {
    const topUsers = await getTopPointsUsersFromDB();
    if (topUsers.length === 0) {
      res.status(200).json(serverResponse('match history', []));
      return;
    }
    const formatedTopUsers = topUsers.map(({ username, image_id, points }) =>
    ({ username, imageId: image_id, points }));

    res.status(200).json(serverResponse('top points users', formatedTopUsers));
  } catch {
    next(new CustomError(500, 'error fetching the top points users'));
  }
};
export const changeUserProfileImage: RequestHandler = async (req, res, next) => {
  const { username, imageId } = req.body;
 const isImageIdValid = imageIdValidation(imageId)
 if (!isImageIdValid) {
  next(new CustomError(400, 'bad imageId'));
  return
 }
  try {
    await updateUserImage(username, imageId)
    res.status(200).json(serverResponse('imageId changed'));
  } catch {
    next(new CustomError(500, 'change the image in the database failed'));
  }
};
