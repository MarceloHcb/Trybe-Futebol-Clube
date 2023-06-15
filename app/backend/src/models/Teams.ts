import SequelizeTeams from '../database/models/SequelizeTeam';
import { ITeam } from '../Interfaces/teams/ITeam';
// import { NewEntity } from '../Interfaces/index';
import { ICRUDModelReader } from '../Interfaces/ICRUDModel';

export default class Teams implements ICRUDModelReader<ITeam> {
  private model = SequelizeTeams;
  async findAll(): Promise<ITeam[]> {
    const teams = await this.model.findAll();
    return teams;
  }

  async findById(id: number): Promise<ITeam | null> {
    const team = await this.model.findByPk(id);
    return team;
  }

  // async create(data: NewEntity<ITeam>): Promise<ITeam> {
  //   const team = await this.model.create(data);
  //   return team;
  // }

  // async update(id: number, data: Partial<ITeam>): Promise<ITeam | null> {
  //   const team = await this.model.findByPk(id);
  //   if (!team) return null;
  //   await team.update(data);
  //   return team;
  // }

  // async delete(id: number): Promise<number> {
  //   const team = await this.model.findByPk(id);
  //   if (!team) return 0;
  //   await team.destroy();
  //   return 1;
  // }
}
