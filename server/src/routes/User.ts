import express from 'express';
import {
  checkUserCookie,
  createUser,
  getTopPointsUsers,
  login,
} from '../controllers/user';
import {
  newUserValidation,
  userCookieValidtion,
} from '../utils/validation/user/functions';
import { errorWrapper } from '../utils/data/functions';

const router = express.Router();
router.post('/register', newUserValidation, errorWrapper(createUser));
router.post('/login', errorWrapper(login));
router.post('/checkUserCookie', errorWrapper(checkUserCookie));
router.post('/getTopPointsUsers', errorWrapper(getTopPointsUsers));
router.use(userCookieValidtion);

export default router;
