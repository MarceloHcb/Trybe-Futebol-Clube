import * as bcrypt from 'bcryptjs';
import User from '../models/User';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IUserModel } from '../Interfaces/users/IUserModel';
// import { IUser } from '../Interfaces/users/IUser';
import JWT from '../utils/JWT';

export default class UserService {
  constructor(
    private userModel: IUserModel = new User(),
    private jwt = JWT,
  ) { }

  async login(email:string, password:string):Promise<ServiceResponse<{ token:string }>> {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || password.length <= 6) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }
    const user = await this.userModel.findByEmail(email);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }
    const token = this.jwt.sign({ email: user.email, role: user.role });
    return { status: 'SUCCESSFUL', data: { token } };
  }
}
