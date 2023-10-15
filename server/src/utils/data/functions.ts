import bcrypt from 'bcrypt';
import { RequestHandler } from 'express';
import { Scores } from '../types/types';
import pool from '../../db/connect';
import { insertMatch, updateUserPoints } from '../../db/database';

const WINNER_POINTS = 10;
const TIE_POINTS = 5;
const LOSSER_POINTS = -10;

const userPoints = {
  0: { playerOnePoints: TIE_POINTS, playerTwoPoints: TIE_POINTS },
  1: { playerOnePoints: WINNER_POINTS, playerTwoPoints: LOSSER_POINTS },
  2: { playerOnePoints: LOSSER_POINTS, playerTwoPoints: WINNER_POINTS },
};

export const formattingUsername = (username: string) => {
  const loweredCaseUsername = username.toLocaleLowerCase();
  const formattedUsername =
    loweredCaseUsername[0].toUpperCase() + loweredCaseUsername.slice(1);
  return formattedUsername;
};

export const encryptingPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(password, salt);
  return encryptedPassword;
};
export const errorWrapper =
  (cb: any): RequestHandler =>
  (req, res, next) =>
    cb(req, res, next).catch(next);

export const saveMatchResults = async (
  player1_username: string,
  player2_username: string,
  game_winner: keyof typeof userPoints,
  scores: Scores
) => {
  let winnerUsername = null;
  if (game_winner === 1) {
    winnerUsername = player1_username;
  } else if (game_winner === 2) {
    winnerUsername = player2_username;
  }
  const { playerOnePoints, playerTwoPoints } = userPoints[game_winner];
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    await insertMatch(
      player1_username,
      player2_username,
      winnerUsername,
      scores
    );
    await updateUserPoints(player1_username, playerOnePoints);
    await updateUserPoints(player2_username, playerTwoPoints);
    await connection.commit();
  } catch {
    await connection.rollback();
  }
};
