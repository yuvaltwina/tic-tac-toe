import express, { type RequestHandler } from 'express';
import { createUser, login } from '../controllers/user';
import {
  newUserValidation,
  userCookieValidtion,
} from '../utils/validation/user/functions';

const errorWrapper =
  (cb: any): RequestHandler =>
  (req, res, next) =>
    cb(req, res, next).catch(next);

const router = express.Router();
router.post('/register', newUserValidation, errorWrapper(createUser));
router.post('/login', errorWrapper(login));

router.use(userCookieValidtion);

export default router;
