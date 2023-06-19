import Teams from '../models/Teams';
import { IMatch } from '../Interfaces/matches/IMatch';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import Match from '../models/Match';
import { ITeamModelCreator } from '../Interfaces/teams/ITeamModel';

export default class MatchService {
  constructor(
    private matchModel: IMatchModel = new Match(),
    private teamModel: ITeamModelCreator = new Teams(),
  ) { }

  async findAllMatches(progress: boolean):Promise<ServiceResponse<IMatch[]>> {
    const match = await this.matchModel.findAllMatches(progress);
    return { status: 'SUCCESSFUL', data: match };
  }

  async FinishedMatch(id: number):Promise<ServiceResponse<number>> {
    const match = await this.matchModel.finish(id);
    if (!match) return { status: 'NOT_FOUND', data: { message: `Partida ${id} não encontrada` } };
    return { status: 'SUCCESSFUL', data: match };
  }

  async UpdateMatch(id: number, data: Partial<IMatch>):Promise<ServiceResponse<IMatch | number>> {
    const match = await this.matchModel.UpdateMatch(id, data);
    if (!match) return { status: 'NOT_FOUND', data: { message: `Partida ${id} não encontrada` } };
    return { status: 'SUCCESSFUL', data: match };
  }

  async CreateMatch(data: Partial<IMatch>):Promise<ServiceResponse<IMatch>> {
    if (data.homeTeamId === data.awayTeamId) {
      return { status: 'DUPLICATE',
        data: { message: 'It is not possible to create a match with two equal teams' } };
    }
    const homeTeam = await this.teamModel.findById(data.homeTeamId);
    const awayTeam = await this.teamModel.findById(data.awayTeamId);
    if (!homeTeam || !awayTeam) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }
    const match = await this.matchModel.CreateMatch(data);
    return { status: 'SUCCESSFUL', data: match };
  }
}
