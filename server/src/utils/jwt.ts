import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { type Tjwt } from './types/types';
dotenv.config();
const secret = process.env.TOKEN_SECRET;

export function generateLoginToken(tokenData: object) {
  const registerToken = jwt.sign(tokenData, secret as string, {
    expiresIn: '7d',
  });
  return registerToken;
}

export function decodeLoginToken(token: string): string {
  let tokenUsername = '';
  jwt.verify(token, secret as string, (err, decoded) => {
    if (err) {
      return '';
    }
    const { username } = decoded as Tjwt;
    tokenUsername = username;
    return tokenUsername;
  });
  return tokenUsername;
}
