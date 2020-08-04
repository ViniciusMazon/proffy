import { Router } from 'express';

const routes = Router();

routes.get('/ping', (req, res) => res.send('Pong!'));

export default routes;