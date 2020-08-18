import { NextFunction, Request, Response } from 'express';
import userModel from '../models/Users';
import hash from '../utils/Hash';
import jwt from '../utils/Token';

class Session {
  async create(req: Request, res: Response) {
    const { email, password } = req.body;

    const userExists = await userModel.getUserByEmail(email);

    if (userExists) {
      const isPasswordCorrect = await hash.compare(userExists.hash_password, password);
      if (!isPasswordCorrect) {
        return res.json({ message: 'Usuário ou senha inválidos' });
      }
    } else {
      return res.json({ message: 'Usuário ou senha inválidos' });
    }

    const token = jwt.create(userExists.id);
    return res.json(token);
  }

  async authenticate(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    const isTokenValid = jwt.verify(String(authorization));
    if (isTokenValid) {
      next();
    } else {
      return res.status(401).json({ message: 'Acesso não autorizado' });
    }
  }
}

export default new Session();
