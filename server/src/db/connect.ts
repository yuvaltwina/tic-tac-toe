import mysql from 'mysql2';
import dotenv from 'dotenv';
import CustomError from '../errors/CustomError';

dotenv.config();

const { MYSQL_PASSWORD } = process.env;
const { MYSQL_HOST } = process.env;
const { MYSQL_USER } = process.env;
const { MYSQL_DATABASE } = process.env;
const pool = mysql
  .createPool({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
  })
  .promise();

async function createTables() {
  try {
    // Create the 'users' table
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
          user_id INT NOT NULL AUTO_INCREMENT,
          username VARCHAR(255) NOT NULL UNIQUE,
          encrypted_password VARCHAR(255) NOT NULL,
          points INT NOT NULL DEFAULT 0,
          PRIMARY KEY (user_id)
        )
      `);

    // Create the 'matches' table
    await pool.query(`
        CREATE TABLE IF NOT EXISTS matches (
          match_id INT NOT NULL AUTO_INCREMENT,
          player1_id INT NOT NULL,
          player2_id INT NOT NULL,
          game_status INT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          PRIMARY KEY (match_id),
          FOREIGN KEY (player1_id) REFERENCES users(user_id),
          FOREIGN KEY (player2_id) REFERENCES users(user_id)
        )
      `);
  } catch (error: any) {
    throw new CustomError(
      500,
      error?.sqlMessage ?? error?.message ?? 'Internal server error'
    );
  }
}

createTables();

export default pool;
