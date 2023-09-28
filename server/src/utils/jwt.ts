import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { type Tjwt } from './types/types';

dotenv.config();
const secret = process.env.TOKEN_SECRET;

export function generateloginToken(username: string) {
  const registerToken = jwt.sign({ username }, secret as string, {
    expiresIn: '7d',
  });
  return registerToken;
}

export function decodeLoginCookieToken(token: string): string {
  let cookieUsername = '';
  jwt.verify(token, secret as string, (err, decoded) => {
    if (err) {
      return '';
    }
    const { username } = decoded as Tjwt;
    cookieUsername = username;
    return cookieUsername;
  });
  return cookieUsername;
}
