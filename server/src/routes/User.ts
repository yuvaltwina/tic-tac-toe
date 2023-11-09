import express from 'express';
import {
  changeUserProfileImage,
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
router.get('/getTopPointsUsers', errorWrapper(getTopPointsUsers));

router.use(userCookieValidtion);

router.post('/changeUserProfileImage', errorWrapper(changeUserProfileImage));

export default router;
