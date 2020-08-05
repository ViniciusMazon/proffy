import { Router } from 'express';
import classesController from './controllers/Classes';

const routes = Router();

routes.post('/classes', classesController.store);
routes.get('/classes', classesController.index);

export default routes;
