import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';

import { ajv } from '../../utils';

import * as userCredentialsDtoSchema from './schemas/userCredentialsDto.json';

import { UserCredentials } from '../../../services/contracts';

import adminService from '../../../services/admins/AdminService';

import logger from '../../../logger';

interface UserCredentialsDto extends Request {
  body: UserCredentials;
}

const validateUserCredentialsDto = ajv.compile(userCredentialsDtoSchema);

export async function signAdminController(
  req: UserCredentialsDto,
  res: Response,
  next: NextFunction
) {
  try {
    if (!validateUserCredentialsDto(req.body)) {
      return next(
        createError(422, 'Incorrect user credentials structure', {
          errors: validateUserCredentialsDto.errors,
        })
      );
    }

    const adminToken = await adminService.getToken(req.body);

    if (!adminToken) {
      return next(createError(401, 'Invalid credentials. Access denied.'));
    }

    logger.info('System admin has received token');

    return res.json({ adminToken });
  } catch (e) {
    return next(e);
  }
}
