import SequelizeTeams from '../database/models/SequelizeTeam';
import { ICRUDModelMatchers } from '../Interfaces/ICRUDModel';
import { IMatch } from '../Interfaces/matches/IMatch';
import SequelizeMatches from '../database/models/SequelizeMatch';

export default class Match implements ICRUDModelMatchers<IMatch> {
  private model = SequelizeMatches;

  static find = {
    include: [
      {
        model: SequelizeTeams,
        as: 'homeTeam',
        attributes: ['teamName'],
      },
      {
        model: SequelizeTeams,
        as: 'awayTeam',
        attributes: ['teamName'],
      },
    ],
  };

  async findAllMatches(inProgress: boolean): Promise<IMatch[]> {
    if (inProgress === undefined) {
      const matches = await this.model.findAll({ ...Match.find });
      return matches;
    }
    const matches = await this.model.findAll({ ...Match.find, where: { inProgress } });
    return matches;
  }

  async finish(id: number): Promise<number> {
    const [count] = await this.model.update(
      { inProgress: false },
      { where: { id } },
    );
    return count;
  }

  async UpdateMatch(id: number, data: Partial<IMatch>): Promise<number> {
    const { homeTeamGoals, awayTeamGoals } = data;
    const [retult] = await this.model.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
    return retult;
  }

  async CreateMatch(data: Partial<IMatch>): Promise<IMatch> {
    const match = await this.model.create(data as IMatch);
    return match.dataValues;
  }
}
