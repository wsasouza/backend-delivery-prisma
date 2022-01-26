import { Router } from 'express';
import { ensureAuthenticateClient } from './middlewares/ensureAuthenticateClient';
import { ensureAuthenticateDeliveryman } from './middlewares/ensureAuthenticateDeliveryman';
import { AuthenticateClientController } from './modules/account/authenticateClient/AuthenticateClientController';
import { AuthenticateDeliverymanController } from './modules/account/authenticateDeliveryman/AuthenticationDeliverymanController';
import { CreateClientController } from './modules/clients/useCases/createClient/CreateClientController';
import { FindAllDeliveriesController } from './modules/clients/useCases/deliveries/FindAllDeliveriesController';
import { CreateDeliveryController } from './modules/deliveries/useCases/createDelivery/CreateDeliveryController';
import { FindAllDeliveryAvailableController } from './modules/deliveries/useCases/findAllDeliveryAvailable/FindAllDeliveryAvailableController';
import { UpdateDeliverymanController } from './modules/deliveries/useCases/updateDeliveryman/UpdateDeliverymanController';
import { CreateDeliverymanController } from './modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController';

const routes = Router();

const authenticateDeliverymanController = new AuthenticateDeliverymanController();
const authenticateClientController = new AuthenticateClientController();

const createClientController = new CreateClientController();
const createDeliverymanController = new CreateDeliverymanController();

const createDeliveryController = new CreateDeliveryController();
const findAllDeliveryAvailableController = new FindAllDeliveryAvailableController();
const updateDeliverymanController = new UpdateDeliverymanController();
const findAllDeliveriesController = new FindAllDeliveriesController();

routes.post('/deliveryman/authenticate', authenticateDeliverymanController.handle);
routes.post('/client/authenticate', authenticateClientController.handle);

routes.post('/client', createClientController.handle);
routes.post('/deliveryman', createDeliverymanController.handle);

routes.post('/delivery', ensureAuthenticateClient, createDeliveryController.handle);
routes.get('/delivery/available', ensureAuthenticateDeliveryman, findAllDeliveryAvailableController.handle);
routes.put('/delivery/update-deliveryman/:id', ensureAuthenticateDeliveryman, updateDeliverymanController.handle);
routes.get('/delivery/client/deliveries', ensureAuthenticateClient, findAllDeliveriesController.handle);

export { routes };