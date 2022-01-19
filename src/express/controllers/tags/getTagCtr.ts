import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';

import { ajv } from '../../utils';

import * as getTagDtoSchema from './schemas/getTagDto.json';

import tagService from '../../../services/tags/TagService';

import { TagDoc } from '../../../databases/mongodb/documents/tags';

interface getTagDto extends Request {
  query: { _id: TagDoc['_id'] };
}

const validateGetTagDto = ajv.compile(getTagDtoSchema);

export async function getTagController(
  req: getTagDto,
  res: Response,
  next: NextFunction
) {
  try {
    if (!validateGetTagDto(req.query)) {
      return next(
        createError(422, 'Incorrect tag query DTO', {
          errors: validateGetTagDto.errors,
        })
      );
    }

    const tag = await tagService.getTag(req.query._id);

    if (!tag) {
      return next(
        createError(404, `There is no tag with id: ${req.query._id}`)
      );
    }

    return res.json(tag);
  } catch (e) {
    return next(e);
  }
}
