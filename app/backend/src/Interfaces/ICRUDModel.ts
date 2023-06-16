import { ID } from '.';
import { IUser } from './users/IUser';

export interface ICRUDModelCreator<T> {
  create(data: Partial<T>): Promise<T>,
}

export interface ICRUDModelReader<T> {
  findAll(): Promise<T[]>,
  findById(id: ID): Promise<T | null>,
}

export interface ICRUDModelMatchers<T> {
  findAllMatches(inProgress: boolean): Promise<T[]>,
  finish(id: ID): Promise<number>,
  UpdateMatch(id: ID, data: Partial<T>): Promise<number>,
  CreateMatch(data: Partial<T>): Promise<T>,
}

export interface ICRUDModelUpdater<T> {
  update(id: ID, data: Partial<T>): Promise<T | null>,
}

export interface ICRUDModelDeleter {
  delete(id: ID): Promise<number>,
}

export interface ICRUDModel<T>
  extends ICRUDModelCreator<T>, ICRUDModelReader<T>, ICRUDModelUpdater<T>,
  ICRUDModelDeleter { }

export interface ICRUDLogin {
  findByEmail(email: string): Promise<IUser | null>,
}
