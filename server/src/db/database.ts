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

export const updateUserPoints = async (user_id: number, newPoints: number) => {
  const updateQuery =
    'UPDATE users SET points = points + ? WHERE user_id = ? LIMIT 1';
  await pool.execute(updateQuery, [newPoints, user_id]);
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
  player1_id: number,
  player2_id: number,
  game_winner: number
) => {
  const insertQuery =
    'INSERT INTO matches (player1_id, player2_id, game_winner) VALUES (?, ?, ?)';
  await pool.execute(insertQuery, [player1_id, player2_id, game_winner]);
};

export const getTopPointsUsersFromDB = async () => {
  const insertQuery =
    'SELECT username, points FROM users ORDER BY points DESC LIMIT 5;';
  const users = await pool.execute(insertQuery);
  return users[0]; //האם להוסיף טרי קאץ למרות שיש באיפה שאני משתמש בפונקציה
};
