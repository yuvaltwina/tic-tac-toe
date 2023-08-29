import { type Request, type Response, type NextFunction } from 'express';
import type CustomError from '../errors/CustomError';

export const errorHandler = (
  error: CustomError,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const status = error.status ?? 500;
  const message = error.message ?? 'Internal server error';
  return response.status(status).json({
    status,
    message,
  });
};

export default errorHandler;
