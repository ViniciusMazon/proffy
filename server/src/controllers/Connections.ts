import { Request, Response } from 'express';
import db from '../database/connections';

class Connections {
  async store(req, res) {
    const { user_id } = req.body;
    await db('connections').insert({ user_id });
    return res.status(201).send();
  }
}

export default new Connections();
