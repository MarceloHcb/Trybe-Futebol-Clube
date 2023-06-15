import Teams from '../models/Teams';
import { ITeamModel } from '../Interfaces/teams/ITeamModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ITeam } from '../Interfaces/teams/ITeam';
import SequelizeTeams from '../database/models/SequelizeTeam';

export default class TeamService {
  private model = SequelizeTeams;
  constructor(
    private teamModel: ITeamModel = new Teams(),
  ) { }

  async findAllTeams():Promise<ServiceResponse<ITeam[]>> {
    const teams = await this.teamModel.findAll();
    return { status: 'SUCCESSFUL', data: teams };
  }

  async findTeamById(id: number):Promise<ServiceResponse<ITeam>> {
    const team = await this.teamModel.findById(id);
    if (!team) return { status: 'NOT_FOUND', data: { message: `Time ${id} não encontrado` } };
    return { status: 'SUCCESSFUL', data: team };
  }
}
