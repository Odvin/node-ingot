import { Router } from 'express';
import { tokenValidator } from '../middlewares';
import { authorizeNcsaCoachController } from '../controllers';
import { updateCoachPinnedTags } from '../controllers/coaches/updateCoachPinnedTags';

const coaches = Router();

coaches.post('/coaches', authorizeNcsaCoachController);
coaches.post('/coaches/pin-tags', tokenValidator, updateCoachPinnedTags);

export { coaches };
