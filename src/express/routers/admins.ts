import { Router } from 'express';
import { tokenValidator } from '../middlewares';
import { signAdminController, docsSeedingCtr } from '../controllers';

const admins = Router();

admins.post('/admins/login', signAdminController);
admins.post('/admins/seeding', tokenValidator, docsSeedingCtr);

export { admins };
