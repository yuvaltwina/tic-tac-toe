import { type RowDataPacket } from 'mysql2';
import pool from './connect';
import type { UserFromDB } from '../utils/types/types';

export async function checkConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Connected to the database');
    connection.release();
  } catch (error: any) {
    console.log(error);
  }
}

export const insertUser = async (
  username: string,
  encryptedPassword: string
) => {
  const insertQuery =
    'INSERT INTO users (username, encrypted_password) VALUES (?, ?)';
  await pool.execute(insertQuery, [username, encryptedPassword]);
};

export const checkIfUserExist = async (username: string) => {
  const selectQuery = 'SELECT * FROM users WHERE username = ? LIMIT 1';
  const [user] = (await pool.execute(selectQuery, [
    username,
  ])) as RowDataPacket[];
  return user[0];
};

export const updateUserPoints = async (username: string, newPoints: number) => {
  const updateQuery =
    'UPDATE users SET points = points + ? WHERE username = ? LIMIT 1';
  await pool.execute(updateQuery, [newPoints, username]);
};

export const getUserDetailsFromDB = async (username: string) => {
  try {
    const selectQuery =
      'SELECT user_id, username, points, image_id FROM users WHERE username = ? LIMIT 1';
    const [userDetails] = (await pool.execute(selectQuery, [
      username,
    ])) as RowDataPacket[];
    if (!userDetails[0]) {
      return null;
    }
    return userDetails[0] as UserFromDB;
  } catch {
    return null;
  }
};

export const insertMatch = async (
  player1_username: string,
  player2_username: string,
  game_winner: number
) => {
  const insertQuery =
    'INSERT INTO matches (player1_username, player2_username, game_winner) VALUES (?, ?, ?)';
  await pool.execute(insertQuery, [
    player1_username,
    player2_username,
    game_winner,
  ]);
};

export const getTopPointsUsersFromDB = async () => {
  const selectQuery =
    'SELECT username, points FROM users ORDER BY points DESC LIMIT 5;';
  const users = await pool.execute(selectQuery);
  return users[0]; //האם להוסיף טרי קאץ למרות שיש באיפה שאני משתמש בפונקציה
};
export const getMatchHistoryFromDB = async (username: string) => {
  const selectQuery = `
  SELECT m.player1_id, m.player2_id, m.game_winner, m.created_at
  FROM matches AS m
  WHERE m.player1_id = ? OR m.player2_id = ?
`;
  const users = await pool.execute(selectQuery, [username, username]);
  console;
  return users[0]; //האם להוסיף טרי קאץ למרות שיש באיפה שאני משתמש בפונקציה
};
