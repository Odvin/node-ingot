import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';

import { ajv } from '../../utils';

import {
  UserTokenPayload,
  UserRole,
  SeedingOptions,
} from '../../../services/contracts';

import * as seedingOptionsDtoSchema from './schemas/seedingOptionsDto.json';

import adminService from '../../../services/admins/AdminService';

interface SeedingOpinionsDto extends Request {
  body: SeedingOptions;
}

interface SignedResponse extends Response {
  locals: { token: UserTokenPayload };
}

const validateSeedingOptionsDto = ajv.compile(seedingOptionsDtoSchema);

export async function docsSeedingCtr(
  req: SeedingOpinionsDto,
  res: SignedResponse,
  next: NextFunction
) {
  try {
    if (res.locals.token.role !== UserRole.ADMIN) {
      return next(createError(403, 'Not enough rights for the operation'));
    }

    if (!validateSeedingOptionsDto(req.body)) {
      return next(
        createError(422, 'Incorrect user credentials structure', {
          errors: validateSeedingOptionsDto.errors,
        })
      );
    }

    const results = await adminService.startSeeding(req.body);

    return res.json(results);
  } catch (e) {
    return next(e);
  }
}
