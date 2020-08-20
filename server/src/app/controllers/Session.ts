import { NextFunction, Request, Response } from 'express';
import userModel from '../models/Users';
import crypto from 'crypto';
import hash from '../../utils/Hash';
import jwt from '../../utils/Token';
import Mail from '../../lib/Mail';

class Session {
  async create(req: Request, res: Response) {
    const { email, password } = req.body;

    const userExists = await userModel.getUserByEmail(email);

    if (userExists) {
      const isPasswordCorrect = await hash.compare(userExists.hash_password, password);
      if (!isPasswordCorrect) {
        return res.status(202).json({ message: 'Usuário ou senha inválidos' });
      }
    } else {
      return res.status(202).json({ message: 'Usuário ou senha inválidos' });
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

  async forgotPassword(req: Request, res: Response) {
    const { email } = req.body;

    try {
      const userExists = await userModel.getUserByEmail(email);
      if (!userExists) {
        return res.status(400).json({ message: 'E-mail não cadastrado' });
      }

      const token = crypto.randomBytes(20).toString('hex');
      await userModel.updatePasswordResetTokenAndExpires(userExists.id, token);
      await Mail.sendMail({
        to: `${userExists.name} <${userExists.email}>`,
        subject: 'Eita, esqueceu sua senha?',
        template: 'resetPassword',
        context: {
          name: userExists.name,
          token: token,
        },
      });

      return res.send();
    } catch (err) {
      return res.status(400).json({ message: 'Erro ao tentar recuperar a senha, tente novamente mais tarde' });
    }
  }

  async resetPassword(req: Request, res: Response) {
    try {
      const { email, token, password } = req.body;

      const userExists = await userModel.getUserByEmail(email);
      if (!userExists) {
        return res.status(400).json({ message: 'E-mail não cadastrado' });
      }
      if (token !== userExists.password_reset_token) {
        return res.status(400).json({ message: 'Token inválido' });
      }
      const now = new Date().toLocaleString();
      if (now > userExists.password_reset_expires) {
        return res.status(400).json({ message: 'O seu token inspirou, gere um novo' });
      }

      await userModel.updatePassword(userExists.id, password);

      return res.send();

    } catch (err) {
      return res.status(400).json({ message: 'Não foi possivel resetar a senha, tente novamente mais tarde' });
    }
  }
}

export default new Session();
