import { Router } from 'express';
import { tokenValidator } from '../middlewares';
import { getAthleteCtr, createAthleteCtr } from '../controllers';

const athletes = Router();

athletes.post('/athletes', tokenValidator, createAthleteCtr);
athletes.get('/athletes', tokenValidator, getAthleteCtr);

export { athletes };
