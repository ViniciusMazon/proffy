import { Router } from 'express';
import classesController from './controllers/Classes';
import connectionsController from './controllers/Connections';
import usersController from './controllers/Users';
import sessionController from './controllers/Session';

const routes = Router();

routes.post('/session', sessionController.create);
routes.post('/registration', usersController.create);
routes.post('/classes', classesController.store);
routes.get('/classes', classesController.index);
routes.post('/connections', connectionsController.store);
routes.get('/connections', sessionController.authenticate, connectionsController.index);

export default routes;
