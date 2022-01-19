import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';

import { ajv } from '../../utils';

import * as createTagDtoSchema from './schemas/createTagDto.json';

import tagService from '../../../services/tags/TagService';

import { TagDoc } from '../../../databases/mongodb/documents/tags';

import { UserTokenPayload } from '../../../services/contracts';

import logger from '../../../logger';

interface CreateTagDto extends Request {
  body: Omit<TagDoc, '_id' | 'updatedAt'>;
}

interface SignedResponse extends Response {
  locals: { token: UserTokenPayload };
}

const validateCreateTagDto = ajv.compile(createTagDtoSchema);

export async function createTagController(
  req: CreateTagDto,
  res: SignedResponse,
  next: NextFunction
) {
  try {
    if (!validateCreateTagDto(req.body)) {
      return next(
        createError(422, 'Incorrect create tag DTO structure', {
          errors: validateCreateTagDto.errors,
        })
      );
    }

    const tagDoc: Omit<TagDoc, '_id' | 'updatedAt'> = {
      ...req.body,
      collegeId: res.locals.token.collegeId,
      coachId: res.locals.token.id,
    };

    const tag = await tagService.createTag(tagDoc);

    logger.info('New tag was created');

    return res.json(tag);
  } catch (e) {
    return next(e);
  }
}
