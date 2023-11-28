import express from 'express';
import { userCookieValidtion } from '../utils/validation/user/functions';
import { errorWrapper } from '../utils/data/functions';
import { getMatchHistory } from '../controllers/match';

const router = express.Router();
router.use(userCookieValidtion);
router.get('/getMatchHistory', errorWrapper(getMatchHistory));

export default router;
