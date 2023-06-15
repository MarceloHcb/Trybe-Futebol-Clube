import SequelizeUser from '../database/models/SequelizeUser';
import { IUser } from '../Interfaces/users/IUser';

export default class User {
  private model = SequelizeUser;
  async findByEmail(email: IUser['email']): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email } });
    return user;
  }
}
