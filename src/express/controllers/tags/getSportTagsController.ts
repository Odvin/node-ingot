import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';

import { ajv } from '../../utils';

import * as getSportTagsDtoSchema from './schemas/getSportTagsDto.json';

import tagService from '../../../services/tags/TagService';

import { TagDoc } from '../../../databases/mongodb/documents/tags';

interface getSportTagsDto extends Request {
  params: { sportId: TagDoc['sportId'] };
}

const validateGetSportTagsDto = ajv.compile(getSportTagsDtoSchema);

export async function getSportTagsController(
  req: getSportTagsDto,
  res: Response,
  next: NextFunction
) {
  try {
    if (!validateGetSportTagsDto(req.params)) {
      return next(
        createError(422, 'Incorrect sport tag query DTO', {
          errors: validateGetSportTagsDto.errors,
        })
      );
    }

    const searchParams = {
      collegeId: res.locals.token.collegeId,
      sportId: req.params.sportId,
    };

    const tags = await tagService.getCollegeSportTags(searchParams);

    return res.json(tags);
  } catch (e) {
    return next(e);
  }
}
