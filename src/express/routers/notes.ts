import { Router } from 'express';
import { tokenValidator } from '../middlewares';

import { createNoteController } from '../controllers/notes/createNoteCtr';
import { updateNoteController } from '../controllers/notes/updateNoteCtr';
import { getAthleteNotesController } from '../controllers/notes/getAthleteNotesCtr';

const notes = Router();

notes.post('/notes', tokenValidator, createNoteController);
notes.patch('/notes', tokenValidator, updateNoteController);
notes.get('/notes', tokenValidator, getAthleteNotesController);

export { notes };
