import mysql from 'mysql2';
import dotenv from 'dotenv';

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
    ssl: { rejectUnauthorized: true },
  })
  .promise();

async function createTables() {
  try {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
          user_id INT NOT NULL AUTO_INCREMENT,
          username VARCHAR(255) NOT NULL UNIQUE,
          is_connected_to_socket BOOLEAN DEFAULT FALSE,
          encrypted_password VARCHAR(255) NOT NULL,
          points INT NOT NULL DEFAULT 0,
          image_id INT NOT NULL DEFAULT 1,
          PRIMARY KEY (user_id)
        )
      `);
    await pool.query(`
        CREATE TABLE IF NOT EXISTS matches (
          match_id INT NOT NULL AUTO_INCREMENT,
          player1_username VARCHAR(255) NOT NULL,
          player2_username VARCHAR(255) NOT NULL,
          scores JSON,
          game_canceled BOOLEAN NOT NULL,
          game_winner VARCHAR(255) ,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          PRIMARY KEY (match_id)
        )
      `);
  } catch (error: any) {
    console.log(error);
  }
}

createTables();

export default pool;
