import { Router } from 'express';
import classesController from './app/controllers/Classes';
import connectionsController from './app/controllers/Connections';
import usersController from './app/controllers/Users';
import sessionController from './app/controllers/Session';

const routes = Router();

routes.post('/session', sessionController.create);
routes.post('/registration', usersController.create);
routes.get('/user/:email', sessionController.authenticate, usersController.show);
routes.post('/forgot-password', sessionController.forgotPassword);
routes.post('/reset-password', sessionController.resetPassword);
routes.post('/classes', sessionController.authenticate, classesController.store);
routes.get('/classes', sessionController.authenticate, classesController.index);
routes.get('/classes/:id', sessionController.authenticate, classesController.show);
routes.delete('/classes/:classId/:weekDay', sessionController.authenticate, classesController.delete);
routes.post('/connections', sessionController.authenticate, connectionsController.store);
routes.get('/connections', sessionController.authenticate, connectionsController.index);

export default routes;
