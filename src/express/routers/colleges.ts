import { Router } from 'express';
import { tokenValidator } from '../middlewares';

import {
  createCollegeController,
  updateCollegeController,
  getCollegeController,
} from '../controllers';

const colleges = Router();

colleges.post('/colleges', tokenValidator, createCollegeController);

colleges.put('/colleges', tokenValidator, updateCollegeController);

colleges.patch('/colleges', tokenValidator, updateCollegeController);

colleges.get('/colleges', tokenValidator, getCollegeController);

export { colleges };
