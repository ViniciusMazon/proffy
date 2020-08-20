import { Router } from 'express';
import classesController from './app/controllers/Classes';
import connectionsController from './app/controllers/Connections';
import usersController from './app/controllers/Users';
import sessionController from './app/controllers/Session';

const routes = Router();

routes.post('/session', sessionController.create);
routes.post('/registration', usersController.create);
routes.post('/forgot-password', sessionController.forgotPassword);
routes.post('/reset-password', sessionController.resetPassword);
routes.post('/classes', classesController.store);
routes.get('/classes', classesController.index);
routes.post('/connections', connectionsController.store);
routes.get('/connections', connectionsController.index);

export default routes;
