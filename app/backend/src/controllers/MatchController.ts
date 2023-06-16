import { Request, Response } from 'express';
import MatchService from '../services/MatchService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchController {
  constructor(private matchService = new MatchService()) {}

  findAllTeams = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    let inProgressBool: boolean | undefined;
    if (inProgress === 'true') {
      inProgressBool = true;
    } else if (inProgress === 'false') {
      inProgressBool = false;
    }
    const { data } = await this.matchService.findAllMatches(inProgressBool as boolean);
    return res.status(200).json(data);
  };

  FinishedMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, data } = await this.matchService.FinishedMatch(Number(id));
    if (status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(status)).json(data);
    }
    return res.status(200).json({ message: 'Finished' });
  };

  UpdateMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, data } = await this.matchService.UpdateMatch(Number(id), req.body);
    if (status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(status)).json(data);
    }
    return res.status(200).json({ message: 'Updated' });
  };

  CreateMatch = async (req: Request, res: Response) => {
    const { status, data } = await this.matchService.CreateMatch(req.body);
    if (status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(status)).json(data);
    }
    return res.status(201).json(data);
  };
}
