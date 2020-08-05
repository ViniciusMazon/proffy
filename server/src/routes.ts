import { Router } from 'express';
import classesController from './controllers/Classes';
import connectionsController from './controllers/Connections';

const routes = Router();

routes.post('/classes', classesController.store);
routes.get('/classes', classesController.index);
routes.post('/connections', connectionsController.store);
routes.get('/connections', connectionsController.index);

export default routes;
