import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';

import { ajv } from '../../utils';

import * as createNoteDtoSchema from './schemas/createNoteDto.json';

import noteService from '../../../services/notes/NoteService';

import { NoteDoc } from '../../../databases/mongodb/documents/note';

import { UserTokenPayload } from '../../../services/contracts';

import logger from '../../../logger';

interface CreateNoteDto extends Request {
  body: Omit<NoteDoc, '_id' | 'updatedAt'>;
}

interface SignedResponse extends Response {
  locals: { token: UserTokenPayload };
}

const validateCreateNoteDto = ajv.compile(createNoteDtoSchema);

export async function createNoteController(
  req: CreateNoteDto,
  res: SignedResponse,
  next: NextFunction
) {
  try {
    if (!validateCreateNoteDto(req.body)) {
      return next(
        createError(422, 'Incorrect create note DTO structure', {
          errors: validateCreateNoteDto.errors,
        })
      );
    }

    const noteDoc: Omit<NoteDoc, '_id' | 'updatedAt'> = {
      ...req.body,
      coachId: res.locals.token.id,
    };

    const note = await noteService.createNote(noteDoc);

    logger.info('New note was created');

    return res.json(note);
  } catch (e) {
    return next(e);
  }
}
