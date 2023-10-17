import { type RowDataPacket } from 'mysql2';
import pool from './connect';
import type { MatchHistory, Scores, UserFromDB } from '../utils/types/types';

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

export const updateUserPoints = async (
  username: string,
  addedPoints: number
) => {
  const userDetails = await getUserDetailsFromDB(username);
  if (!userDetails) {
    throw new Error(`coudlnt find the user :  ${username} details`);
  }
  const { points: currentPoints } = userDetails;
  let newPoints = currentPoints + addedPoints;
  if (newPoints < 0) {
    newPoints = 0;
  }
  const updateQuery = 'UPDATE users SET points = ? WHERE username = ? LIMIT 1';
  await pool.execute(updateQuery, [newPoints, username]);
};

export const updateUserConnectedStatus = async (
  username: string,
  isConnected: boolean
) => {
  const updateQuery =
    'UPDATE users SET is_connected_to_socket = ? WHERE username = ? LIMIT 1';
  await pool.execute(updateQuery, [isConnected, username]);
};

export const insertMatch = async (
  player1_username: string,
  player2_username: string,
  winnerUsername: string | null,
  scores: Scores,
  gameCanceled: boolean
) => {
  const insertQuery =
    'INSERT INTO matches (player1_username, player2_username,scores, game_winner,game_canceled) VALUES (?, ?, ?,?,?)';
  await pool.execute(insertQuery, [
    player1_username,
    player2_username,
    scores,
    winnerUsername,
    gameCanceled,
  ]);
};

export const getUserDetailsFromDB = async (username: string) => {
  try {
    const selectQuery =
      'SELECT user_id, username, points, image_id , is_connected_to_socket FROM users WHERE username = ? LIMIT 1';
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

export const getTopPointsUsersFromDB = async () => {
  const selectQuery =
    'SELECT user_id, username, points, image_id FROM users ORDER BY points DESC LIMIT 5;';
  const users = await pool.execute(selectQuery);
  return users[0] as UserFromDB[];
};

export const getMatchHistoryFromDB = async (user_id: string) => {
  const selectQuery = `
  SELECT
    matches.match_id,
    matches.scores,
    matches.game_winner,
    matches.created_at,
    matches.game_canceled,
    users1.username AS player1_username,
    users1.points AS player1_points,
    users1.image_id AS player1_image_id,
    users2.username AS player2_username,
    users2.points AS player2_points,
    users2.image_id AS player2_image_id
  FROM
    matches
  INNER JOIN
    users AS users1
  ON
    matches.player1_username = users1.username
  INNER JOIN
    users AS users2
  ON
    matches.player2_username = users2.username
  WHERE
    matches.player1_username = ? OR matches.player2_username = ?
  ORDER BY
    matches.created_at DESC;
`;
  const matches = await pool.execute(selectQuery, [user_id, user_id]);
  return matches[0] as MatchHistory;
};
