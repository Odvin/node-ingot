import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';

import { ajv } from '../../utils';

import * as updateNoteDtoSchema from './schemas/updateNoteDto.json';

import noteService from '../../../services/notes/NoteService';

import { NoteDoc } from '../../../databases/mongodb/documents/note';

import { UserTokenPayload } from '../../../services/contracts';

import logger from '../../../logger';

interface UpdateNoteDto extends Request {
  body: Pick<NoteDoc, '_id' | 'athleteId'> & Partial<NoteDoc>;
}

interface SignedResponse extends Response {
  locals: { token: UserTokenPayload };
}

const validateUpdateNoteDto = ajv.compile(updateNoteDtoSchema);

export async function updateNoteController(
  req: UpdateNoteDto,
  res: SignedResponse,
  next: NextFunction
) {
  try {
    if (!validateUpdateNoteDto(req.body)) {
      return next(
        createError(422, 'Incorrect update note DTO structure', {
          errors: validateUpdateNoteDto.errors,
        })
      );
    }

    const noteDoc: Pick<NoteDoc, '_id' | 'athleteId' | 'coachId'> &
      Partial<NoteDoc> = {
      ...req.body,
      coachId: res.locals.token.id,
    };

    const note = await noteService.updateNote(noteDoc);

    if (!note) {
      return next(createError(404, 'Coach has to update only their own notes'));
    }

    logger.info(`The note with id: ${req.body._id} was updated`);

    return res.json(note);
  } catch (e) {
    return next(e);
  }
}
