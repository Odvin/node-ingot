import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';

import { ajv } from '../../utils';

import * as createSportsDtoSchema from './schemas/createSportsDto.json';

import sportService from '../../../services/sports/SportService';

import { UserTokenPayload, UserRole } from '../../../services/contracts';

import { SportDoc } from '../../../databases/mongodb/documents/sports';

import logger from '../../../logger';

const validateCreateSportsDto = ajv.compile(createSportsDtoSchema);

interface CreateSportsDto extends Request {
  body: Omit<SportDoc, '_id'>;
}

interface SignedResponse extends Response {
  locals: { token: UserTokenPayload };
}

export async function createSportsController(
  req: CreateSportsDto,
  res: SignedResponse,
  next: NextFunction
) {
  try {
    if (res.locals.token.role !== UserRole.ADMIN) {
      return next(createError(403, 'Not enough rights for the operation'));
    }

    if (!validateCreateSportsDto(req.body)) {
      return next(
        createError(422, 'Incorrect sport DTO structure', {
          errors: validateCreateSportsDto.errors,
        })
      );
    }

    const sport = await sportService.createSport(req.body);

    logger.info('New sport was created');

    return res.json(sport);
  } catch (e) {
    return next(e);
  }
}
