import { RequestHandler } from 'express';
import matchValidationScheme from './scheme';
import Joi from 'joi';
import CustomError from '../../../errors/CustomError';

export const newMatchValidation: RequestHandler = (req, res, next) => {
  const { player1_id, player2_id, game_status } = req.body;
  const newMatch = { player1_id, player2_id, game_status };
  const { playerIdValidation, gameWinnerValidation } = matchValidationScheme;
  const { error } = Joi.object({
    player1_id: playerIdValidation,
    player2_id: playerIdValidation,
    game_status: gameWinnerValidation,
  }).validate(newMatch);
  if (error) {
    next(new CustomError(400, error.message));
    return;
  }
  next();
};
