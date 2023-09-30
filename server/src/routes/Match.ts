import express from 'express';
import { userCookieValidtion } from '../utils/validation/user/functions';
import { errorWrapper } from '../utils/data/functions';
import { newMatchValidation } from '../utils/validation/match/functions';
import { saveMatchResults } from '../controllers/match';
const router = express.Router();
router.use(userCookieValidtion);
router.post(
  '/saveMatchResults',
  newMatchValidation,
  errorWrapper(saveMatchResults)
);
// router.post('/getMatchHistory', errorWrapper(login));

export default router;
