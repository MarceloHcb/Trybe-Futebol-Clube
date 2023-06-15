import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import JWT from '../utils/JWT';

interface CustomRequest extends Request {
  payload?: JwtPayload | string;
}

export default class Validations {
  static async validateToken(req: CustomRequest, res: Response, next: NextFunction):
  Promise<Response | void> {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const validToken = await JWT.verify(token);
    req.payload = validToken;
    if (validToken === 'Token must be a valid token') {
      return res.status(401).json({ message: validToken });
    }
    next();
  }
}
