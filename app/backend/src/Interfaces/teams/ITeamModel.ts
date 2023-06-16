import { ID } from '..';
import { ICRUDModelReader } from '../ICRUDModel';
import { ITeam } from './ITeam';

export type ITeamModel = ICRUDModelReader<ITeam>;
export interface ITeamModelCreator {
  findById(id: ID | undefined): Promise<ITeam | null> | number,
}
