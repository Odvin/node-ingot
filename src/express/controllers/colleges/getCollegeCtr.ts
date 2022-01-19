import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';

import { ajv } from '../../utils';

import * as getCollegeDtoSchema from './schemas/getCollegeDto.json';

import collegeService from '../../../services/colleges/CollegeService';

import { CollegeDoc } from '../../../databases/mongodb/documents/colleges';

const validateGetCollegeDto = ajv.compile(getCollegeDtoSchema);

interface getCollegeDto extends Request {
  query: { _id: CollegeDoc['_id'] };
}

export async function getCollegeController(
  req: getCollegeDto,
  res: Response,
  next: NextFunction
) {
  try {
    if (!validateGetCollegeDto(req.query)) {
      return next(
        createError(422, 'Incorrect search options to select college', {
          errors: validateGetCollegeDto.errors,
        })
      );
    }

    const { _id } = req.query;

    const college = await collegeService.getCollege(_id);

    if (!college) {
      return next(createError(404, `There is no college with id: ${_id}`));
    }

    return res.json(college);
  } catch (e) {
    return next(e);
  }
}
