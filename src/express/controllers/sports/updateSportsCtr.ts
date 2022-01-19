import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';

import sportService from '../../../services/sports/SportService';
import { SportDoc } from '../../../databases/mongodb/documents/sports';

import { ajv } from '../../utils';

import * as updateSportsDtoSchema from './schemas/updateSportsDto.json';

import { UserTokenPayload, UserRole } from '../../../services/contracts';

import logger from '../../../logger';

interface UpdateSportsDto extends Request {
  body: Pick<SportDoc, '_id'> & Partial<SportDoc>;
}

interface SignedResponse extends Response {
  locals: { token: UserTokenPayload };
}

const validateUpdateSportsDto = ajv.compile(updateSportsDtoSchema);

export async function updateSportsController(
  req: UpdateSportsDto,
  res: SignedResponse,
  next: NextFunction
) {
  try {
    if (res.locals.token.role !== UserRole.ADMIN) {
      return next(createError(403, 'Not enough rights for the operation'));
    }

    if (!validateUpdateSportsDto(req.body)) {
      return next(
        createError(422, 'Incorrect update sport DTO structure', {
          errors: validateUpdateSportsDto.errors,
        })
      );
    }

    const sport = await sportService.updateSport(req.body);

    if (!sport) {
      return next(
        createError(404, `There is no sport with id: ${req.body._id}`)
      );
    }

    logger.info(`The sport with id: ${req.body._id} was updated`);

    return res.json(sport);
  } catch (e) {
    return next(e);
  }
}
