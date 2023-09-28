import { type RowDataPacket } from 'mysql2';
import pool from './connect';
import CustomError from '../errors/CustomError';

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
  const selectQuery = 'SELECT * FROM users WHERE username = ?';
  const [user] = (await pool.execute(selectQuery, [
    username,
  ])) as RowDataPacket[];
  return user[0];
};

export const getUserDetailsFromDB = async (username: string) => {
  const selectQuery = 'SELECT * FROM users WHERE username = ?';
  const [user] = (await pool.execute(selectQuery, [
    username,
  ])) as RowDataPacket[];
  return user[0];
};
