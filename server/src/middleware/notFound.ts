import { type Request, type Response } from 'express';

const notFound = (req: Request, res: Response) =>
  res.status(404).json({
    message: 'route not found',
  });
export default notFound;
