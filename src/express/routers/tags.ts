import { Router } from 'express';
import { tokenValidator } from '../middlewares';

import {
  createTagController,
  updateTagController,
  getTagController,
  getSportTagsController,
} from '../controllers';

const tags = Router();

tags.post('/tags', tokenValidator, createTagController);

tags.patch('/tags', tokenValidator, updateTagController);

tags.get('/tags', tokenValidator, getTagController);

tags.get('/tags/collection/:sportId', tokenValidator, getSportTagsController);

export { tags };
