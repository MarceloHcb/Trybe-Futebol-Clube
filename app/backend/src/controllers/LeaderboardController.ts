import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) {}
  getPerformance = async (_req: Request, res: Response) => {
    const data = await this.leaderboardService.getLeaderboard();
    return res.status(200).json(data);
  };
}
