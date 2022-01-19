import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';

import { ajv } from '../../utils';

import * as createAthleteDtoSchema from './schemas/createAthleteDto.json';

import athleteService from '../../../services/athletes/AthleteService';

import { Athlete } from '../../../databases/postgre/entities/AthletesEnt';

import { UserTokenPayload, UserRole } from '../../../services/contracts';

interface CreateAthleteDto extends Request {
  body: Omit<Athlete, 'athlete_id'>;
}

interface SignedResponse extends Response {
  locals: { token: UserTokenPayload };
}

const validateCreateAthleteDto = ajv.compile(createAthleteDtoSchema);

export async function createAthleteCtr(
  req: CreateAthleteDto,
  res: SignedResponse,
  next: NextFunction
) {
  try {
    if (res.locals.token.role !== UserRole.ADMIN) {
      return next(createError(403, 'Not enough rights for the operation'));
    }

    if (!validateCreateAthleteDto(req.body)) {
      return next(
        createError(422, 'Incorrect athlete DTO structure', {
          errors: validateCreateAthleteDto.errors,
        })
      );
    }

    const athlete_id = await athleteService.createAthlete(req.body);

    res.json({ athlete_id });
  } catch (e) {
    return next(e);
  }
}
