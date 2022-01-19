import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';

import { ajv } from '../../utils';

import * as getSportsDtoSchema from './schemas/getSportsDto.json';

import sportService from '../../../services/sports/SportService';

import { SportDoc } from '../../../databases/mongodb/documents/sports';

interface getSportsDto extends Request {
  query: { _id: SportDoc['_id'] };
}

const validateGetSportsDto = ajv.compile(getSportsDtoSchema);

export async function getSportsController(
  req: getSportsDto,
  res: Response,
  next: NextFunction
) {
  try {
    if (!validateGetSportsDto(req.query)) {
      return next(
        createError(422, 'Incorrect search options to select sport', {
          errors: validateGetSportsDto.errors,
        })
      );
    }

    const { _id } = req.query;

    const sport = await sportService.getSport(_id);

    if (!sport) {
      return next(createError(404, `There is no sport with id: ${_id}`));
    }

    return res.json(sport);
  } catch (e) {
    return next(e);
  }
}
