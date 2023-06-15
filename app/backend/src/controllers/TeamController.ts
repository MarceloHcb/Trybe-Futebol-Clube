import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import TeamService from '../services/team.service';

export default class TeamController {
  constructor(
    private teamService = new TeamService(),
  ) { }

  async findAllTeams(_req: Request, res: Response): Promise<Response> {
    try {
      const { data } = await this.teamService.findAllTeams();
      return res.status(200).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async findTeamById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { status, data } = await this.teamService.findTeamById(Number(id));
      if (status !== 'SUCCESSFUL') {
        return res.status(mapStatusHTTP(status)).json(data);
      }
      return res.status(200).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
