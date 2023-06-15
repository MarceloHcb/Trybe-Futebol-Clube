import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import TeamService from '../services/TeamService';

export default class TeamController {
  constructor(
    private teamService = new TeamService(),
  ) { }

  findAllTeams = async (_req: Request, res: Response) => {
    const { data } = await this.teamService.findAllTeams();
    return res.status(200).json(data);
  };

  findTeamById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, data } = await this.teamService.findTeamById(Number(id));
    if (status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(status)).json(data);
    }
    return res.status(200).json(data);
  };
}
