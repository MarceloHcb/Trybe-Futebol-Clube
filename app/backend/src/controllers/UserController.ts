import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import UserService from '../services/UserService';

interface CustomRequest extends Request {
  payload?: JwtPayload & { role?: string };
}
export default class UserController {
  constructor(
    private userService = new UserService(),
  ) { }

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    const { status, data } = await this.userService.login(email, password);
    if (status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(status)).json(data);
    }
    return res.status(200).json(data);
  };

  findByRole = async (req: CustomRequest, res: Response) => {
    const { role } = req.payload || {};
    return res.status(200).json({ role });
  };
}
