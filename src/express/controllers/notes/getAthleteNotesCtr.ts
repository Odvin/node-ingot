import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';

import { ajv } from '../../utils';

import * as getAthleteNotesDtoSchema from './schemas/getAthleteNotesDto.json';

import noteService from '../../../services/notes/NoteService';

import { NoteDoc } from '../../../databases/mongodb/documents/note';

interface getAthleteNotesDto extends Request {
  query: { athleteId: NoteDoc['athleteId'] };
}

const validateGetAthleteNotesDto = ajv.compile(getAthleteNotesDtoSchema);

export async function getAthleteNotesController(
  req: getAthleteNotesDto,
  res: Response,
  next: NextFunction
) {
  try {
    if (!validateGetAthleteNotesDto(req.query)) {
      return next(
        createError(422, 'Incorrect athletes notes query DTO', {
          errors: validateGetAthleteNotesDto.errors,
        })
      );
    }

    const notes = await noteService.getAthleteNotes(req.query.athleteId);

    return res.json(notes);
  } catch (e) {
    return next(e);
  }
}
