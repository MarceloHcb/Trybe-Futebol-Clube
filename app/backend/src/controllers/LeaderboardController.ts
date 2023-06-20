import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) {}
  getPerformance = async (_req: Request, res: Response) => {
    const data = await this.leaderboardService.getLeaderboard(true, true);
    return res.status(200).json(data);
  };

  getHomePerformance = async (_req: Request, res: Response) => {
    const data = await this.leaderboardService.getLeaderboard(false, false);
    return res.status(200).json(data);
  };

  getAwayPerformance = async (_req: Request, res: Response) => {
    const data = await this.leaderboardService.getLeaderboard(true, false);
    return res.status(200).json(data);
  };
}
