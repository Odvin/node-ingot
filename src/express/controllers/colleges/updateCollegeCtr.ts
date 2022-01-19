import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';

import { ajv } from '../../utils';

import * as updateCollegeDtoSchema from './schemas/updateCollegeDto.json';

import collegeService from '../../../services/colleges/CollegeService';

import { CollegeDoc } from '../../../databases/mongodb/documents/colleges';

import { UserTokenPayload, UserRole } from '../../../services/contracts';

import logger from '../../../logger';

const validateUpdateCollegeDto = ajv.compile(updateCollegeDtoSchema);

interface UpdateCollegeDto extends Request {
  body: Pick<CollegeDoc, '_id'> & Partial<CollegeDoc>;
}

interface SignedResponse extends Response {
  locals: { token: UserTokenPayload };
}

export async function updateCollegeController(
  req: UpdateCollegeDto,
  res: SignedResponse,
  next: NextFunction
) {
  try {
    if (res.locals.token.role !== UserRole.ADMIN) {
      return next(createError(403, 'Not enough rights for the operation'));
    }

    if (!validateUpdateCollegeDto(req.body)) {
      return next(
        createError(422, 'Incorrect update college DTO structure', {
          errors: validateUpdateCollegeDto.errors,
        })
      );
    }

    const college = await collegeService.updateCollege(req.body);

    if (!college) {
      return next(
        createError(404, `There is no college with id: ${req.body._id}`)
      );
    }

    logger.info(`The college with id: ${req.body._id} was updated`);

    return res.json(college);
  } catch (e) {
    return next(e);
  }
}
