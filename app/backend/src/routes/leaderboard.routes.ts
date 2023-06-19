import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const router = Router();
const leaderboardController = new LeaderboardController();
router.get('/home', leaderboardController.getHomePerformance);
router.get('/away', leaderboardController.getAwayPerformance);

export default router;
