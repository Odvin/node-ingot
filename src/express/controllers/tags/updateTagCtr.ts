import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';

import { ajv } from '../../utils';

import * as updateTagDtoSchema from './schemas/updateTagDto.json';

import tagService from '../../../services/tags/TagService';

import { TagDoc } from '../../../databases/mongodb/documents/tags';

import { UserTokenPayload } from '../../../services/contracts';

import logger from '../../../logger';

interface UpdateTagDto extends Request {
  body: Pick<TagDoc, '_id' | 'sportId'> & Partial<TagDoc>;
}

interface SignedResponse extends Response {
  locals: { token: UserTokenPayload };
}

const validateUpdateTagDto = ajv.compile(updateTagDtoSchema);

export async function updateTagController(
  req: UpdateTagDto,
  res: SignedResponse,
  next: NextFunction
) {
  try {
    if (!validateUpdateTagDto(req.body)) {
      return next(
        createError(422, 'Incorrect update tag DTO structure', {
          errors: validateUpdateTagDto.errors,
        })
      );
    }

    const tagDoc: Pick<TagDoc, '_id' | 'coachId' | 'collegeId' | 'sportId'> &
      Partial<TagDoc> = {
      ...req.body,
      coachId: res.locals.token.id,
      collegeId: res.locals.token.collegeId,
    };

    const tag = await tagService.updateTag(tagDoc);

    if (!tag) {
      return next(createError(404, 'Coach has to update only their own tags'));
    }

    logger.info(`The tag with id: ${req.body._id} was updated`);

    return res.json(tag);
  } catch (e) {
    return next(e);
  }
}
