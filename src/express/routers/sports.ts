import { Router } from 'express';
import { tokenValidator } from '../middlewares';

import {
  createSportsController,
  updateSportsController,
  getSportsController,
} from '../controllers';

const sports = Router();

sports.post('/sports', tokenValidator, createSportsController);

sports.patch('/sports', tokenValidator, updateSportsController);

sports.get('/sports', tokenValidator, getSportsController);

export { sports };
