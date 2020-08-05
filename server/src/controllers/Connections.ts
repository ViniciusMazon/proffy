import { Request, Response } from 'express';
import db from '../database/connections';

class Connections {
  async store(req, res) {
    const { user_id } = req.body;
    await db('connections').insert({ user_id });
    return res.status(201).send();
  }

  async index(req, res) {
    const totalConnections = await db('connections')
      .count('* as total');

    const { total } = totalConnections[0];
    return res.json({ total });
  }
}

export default new Connections();
