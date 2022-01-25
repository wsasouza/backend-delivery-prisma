import { Router } from 'express';
import { AuthenticateClientController } from './modules/account/authenticateClient/AuthenticateClientController';
import { AuthenticateDeliverymanController } from './modules/account/authenticateDeliveryman/AuthenticationDeliverymanController';
import { CreateClientController } from './modules/clients/useCases/createClient/CreateClientController';
import { CreateDeliverymanController } from './modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController';

const routes = Router();

const authenticateDeliverymanController = new AuthenticateDeliverymanController();
const authenticateClientController = new AuthenticateClientController();

const createClientController = new CreateClientController();
const createDeliverymanController = new CreateDeliverymanController();

routes.post('/deliveryman/authenticate', authenticateDeliverymanController.handle);
routes.post('/client/authenticate', authenticateClientController.handle);

routes.post('/client', createClientController.handle);
routes.post('/deliveryman', createDeliverymanController.handle);

export { routes };