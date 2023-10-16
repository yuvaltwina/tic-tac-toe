import { RequestHandler } from 'express';
import { getMatchHistoryFromDB } from '../db/database';
import serverResponse from '../utils/serverResponse';
import CustomError from '../errors/CustomError';
import { MatchHistory } from '../utils/types/types';

export const getMatchHistory: RequestHandler = async (req, res, next) => {
  const { username } = req.body;
  try {
    const matchHistory = await getMatchHistoryFromDB(username);
    if (matchHistory.length === 0) {
      res.status(200).json(serverResponse('match history', []));
      return;
    }
    const formatedMatchHistory = (matchHistory as MatchHistory).map(
      ({
        match_id,
        scores,
        game_winner,
        created_at,
        game_canceled,
        player1_username,
        player1_points,
        player1_image_id,
        player2_username,
        player2_points,
        player2_image_id,
      }) => {
        const playerOne = {
          username: player1_username,
          points: player1_points,
          imageId: player1_image_id,
        };
        const playerTwo = {
          username: player2_username,
          points: player2_points,
          imageId: player2_image_id,
        };

        return {
          matchId: match_id,
          game_canceled,
          scores,
          gameWinner: game_winner,
          createdAt: created_at,
          playerOne,
          playerTwo,
        };
      }
    );
    console.log(formatedMatchHistory);
    res.status(200).json(serverResponse('match history', formatedMatchHistory));
  } catch {
    next(new CustomError(500, 'error fetching the match history'));
  }
};
