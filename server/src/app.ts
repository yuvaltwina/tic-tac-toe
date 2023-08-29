import express from 'express';
import dotenv from 'dotenv';
import pool from './db/connect';
import notFound from './middleware/notFound';
import errorHandler from './middleware/errorHandler';
import CustomError from './errors/CustomError';

dotenv.config();
const PORT = process.env.PORT ?? 3000;
const app = express();
app.get('/', (req, res) => {
  res.send('welcome to Tic tac toe');
});
async function checkConnection() {
  const connection = await pool.getConnection();
  console.log('Connected to the database');
  connection.release();
}
app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    await checkConnection();
    app.listen(PORT, () => {
      console.log(`Server listening at port: ${PORT}`);
    });
  } catch (error: any) {
    throw new CustomError(
      500,
      error?.sqlMessage ?? error?.message ?? 'Internal server error'
    );
  }
};
start();
