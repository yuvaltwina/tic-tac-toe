import { type RowDataPacket } from 'mysql2';
import pool from './connect';

export async function checkConnection() {
  const connection = await pool.getConnection();
  console.log('Connected to the database');
  connection.release();
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
