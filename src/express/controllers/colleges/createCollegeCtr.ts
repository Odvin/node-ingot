import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';

import { ajv } from '../../utils';

import * as createCollegeDtoSchema from './schemas/createCollegeDto.json';

import collegeService from '../../../services/colleges/CollegeService';

import { CollegeDoc } from '../../../databases/mongodb/documents/colleges';

import { UserTokenPayload, UserRole } from '../../../services/contracts';

import logger from '../../../logger';

interface CreateCollegeDto extends Request {
  body: Omit<CollegeDoc, '_id'>;
}

interface SignedResponse extends Response {
  locals: { token: UserTokenPayload };
}

const validateCreateCollegeDto = ajv.compile(createCollegeDtoSchema);

export async function createCollegeController(
  req: CreateCollegeDto,
  res: SignedResponse,
  next: NextFunction
) {
  try {
    if (res.locals.token.role !== UserRole.ADMIN) {
      return next(createError(403, 'Not enough rights for the operation'));
    }

    if (!validateCreateCollegeDto(req.body)) {
      return next(
        createError(422, 'Incorrect college DTO structure', {
          errors: validateCreateCollegeDto.errors,
        })
      );
    }

    const college = await collegeService.createCollege(req.body);

    logger.info('New college was created');

    return res.json(college);
  } catch (e) {
    return next(e);
  }
}
