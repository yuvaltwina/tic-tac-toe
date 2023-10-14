import { RequestHandler } from 'express';
import { getMatchHistoryFromDB } from '../db/database';
import serverResponse from '../utils/serverResponse';
import CustomError from '../errors/CustomError';

export const getMatchHistory: RequestHandler = async (req, res, next) => {
  const { username } = req.body;
  try {
    const matchHistory = await getMatchHistoryFromDB(username);
    res.status(200).json(serverResponse('match history', matchHistory));
  } catch {
    next(new CustomError(500, 'error fetching the match history'));
  }
};
