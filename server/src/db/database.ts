import { type RowDataPacket } from 'mysql2';
import pool from './connect';
import type { Player } from '../utils/types/types';

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

export const changeUserPoints = async (username: string, newPoints: number) => {
  const selectQuery = 'SELECT * FROM users WHERE username = ? LIMIT 1';
  const [user] = (await pool.execute(selectQuery, [
    username,
  ])) as RowDataPacket[];
  if (user && user.length > 0) {
    const currentUser = user[0];
    const currentPoints = currentUser.points;
    const updatedPoints = currentPoints + newPoints;
    const updateQuery =
      'UPDATE users SET points = ? WHERE username = ? LIMIT 1';
    await pool.execute(updateQuery, [updatedPoints, username]);
  }
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
    return userDetails[0] as Omit<Player, 'name'> & { username: string };
  } catch {
    return null;
  }
};

export const insertMatch = async (
  player1_id: string,
  player2_id: string,
  game_status: number
) => {
  const insertQuery =
    'INSERT INTO matches (player1_id, player2_id, game_status) VALUES (?, ?, ?)';
  await pool.execute(insertQuery, [player1_id, player2_id, game_status]);
};
