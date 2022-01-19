import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';

import { ajv } from '../../utils';

import * as pinnedTagsDtoSchema from './schemas/pinnedTagsDto.json';

import coachService from '../../../services/coaches/CoachService';

import { UserTokenPayload } from '../../../services/contracts';

interface PinnedTagsDto extends Request {
  body: {
    tags: string[];
  };
}

interface SignedResponse extends Response {
  locals: { token: UserTokenPayload };
}

const validatePinnedTagsDto = ajv.compile(pinnedTagsDtoSchema);

export async function updateCoachPinnedTags(
  req: PinnedTagsDto,
  res: SignedResponse,
  next: NextFunction
) {
  try {
    if (!validatePinnedTagsDto(req.body)) {
      return next(
        createError(422, 'Incorrect update coach pinned tags DTO structure', {
          errors: validatePinnedTagsDto.errors,
        })
      );
    }

    const updatedPinnedTags = await coachService.setPinnedTags(
      res.locals.token.id,
      req.body.tags
    );

    return res.json(updatedPinnedTags);
  } catch (e) {
    return next(e);
  }
}
