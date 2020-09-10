import { Request, Response } from 'express';
import usersModel from '../models/Users';


class Users {
  async create(req: Request, res: Response) {
    const {
      name, surname, email, password
    } = req.body;

    const userAlreadyExists = await usersModel.getUserByEmail(email);
    if (userAlreadyExists) {
      return res.status(200).json({ message: 'E-mail já cadastrado' });
    }

    try {
      await usersModel.store(name, surname, email, password);
      res.status(201).json({ message: 'Usuário criado com sucesso' });
    } catch (error) {
      res.status(400).json({ message: 'Serviço indisponível no momento', error })
    }
  }

  async show(req: Request, res: Response) {
    try {
      const user = await usersModel.getUserByEmail(String(req.params.email));
      const data = {
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        avatar: user.avatar,
        whatsapp: user.whatsapp,
        bio: user.bio,
      }
      return res.status(200).json(data);
    } catch (error) {
      return res.status(400).json({ message: 'Serviço indisponível no momento', error });
    }
  }
}

export default new Users();
