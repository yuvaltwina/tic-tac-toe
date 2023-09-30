import { RequestHandler } from 'express';
import { insertMatch } from '../db/database';
import serverResponse from '../utils/serverResponse';

export const saveMatchResults: RequestHandler = async (req, res, next) => {
  const { player1_id, player2_id, game_status } = req.body;
  await insertMatch(player1_id, player2_id, game_status);
  res.status(201).json(serverResponse('new match created'));
};
// export const createUser: RequestHandler = async (req, res, next) => {
//     const { username, password } = req.body;
//     const formattedUsername = formattingUsername(username);
//     const encryptedPassword = await encryptingPassword(password);
//     await insertUser(formattedUsername, encryptedPassword);
//     res.status(201).json(serverResponse('new user created'));
//   };
