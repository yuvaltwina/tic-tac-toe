import { RequestHandler } from 'express';
import { insertMatch, updateUserPoints } from '../db/database';
import serverResponse from '../utils/serverResponse';
import pool from '../db/connect';

const WINNER_POINTS = 10;
const TIE_POINTS = 5;
const LOSSER_POINTS = -10;

const userPoints = {
  0: { playerOnePoints: TIE_POINTS, playerTwoPoints: TIE_POINTS },
  1: { playerOnePoints: WINNER_POINTS, playerTwoPoints: LOSSER_POINTS },
  2: { playerOnePoints: LOSSER_POINTS, playerTwoPoints: WINNER_POINTS },
};

export const saveMatchResults = async (
  player1_username: string,
  player2_username: string,
  game_winner: keyof typeof userPoints
) => {
  const { playerOnePoints, playerTwoPoints } = userPoints[game_winner];
  const connection = await pool.getConnection();
  try {
    console.log('start saving');
    await connection.beginTransaction();

    await insertMatch(player1_username, player2_username, game_winner);
    await updateUserPoints(player1_username, playerOnePoints);
    await updateUserPoints(player2_username, playerTwoPoints);

    await connection.commit();
    console.log('saved');
  } catch (error) {
    console.log(error);
    await connection.rollback();
  }
};
