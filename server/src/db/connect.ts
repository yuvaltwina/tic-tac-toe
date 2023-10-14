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
  })
  .promise();
// למה צריך ליצור את הטבלאות כל פעם מחדש
// איפה כל התוכן של הטבלאות נשמר
async function createTables() {
  try {
    // Create the 'users' table
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
          user_id INT NOT NULL AUTO_INCREMENT,
          username VARCHAR(255) NOT NULL UNIQUE,
          encrypted_password VARCHAR(255) NOT NULL,
          points INT NOT NULL DEFAULT 0,
          image_id INT NOT NULL DEFAULT 1,
          PRIMARY KEY (user_id)
        )
      `);

    // Create the 'matches' table
    await pool.query(`
        CREATE TABLE IF NOT EXISTS matches (
          match_id INT NOT NULL AUTO_INCREMENT,
          player1_username VARCHAR(255) NOT NULL,
          player2_username VARCHAR(255) NOT NULL,
          scores JSON,
          game_winner INT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          PRIMARY KEY (match_id),
          FOREIGN KEY (player1_username) REFERENCES users(username),
          FOREIGN KEY (player2_username) REFERENCES users(username)
        )
      `);
  } catch (error: any) {
    console.log(error);
  }
}
// player1_score INT NOT NULL,
// player2_score INT NOT NULL,
createTables();

export default pool;
