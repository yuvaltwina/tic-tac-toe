import { Router } from 'express';
import userRouter from './User';
import matchRouter from './Match';

const router = Router();
router.use('/user', userRouter);
router.use('/match', matchRouter);
export default router;
