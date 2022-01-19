import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';

import coachService from '../../../services/coaches/CoachService';

interface AuthorizeNcsaCoachDto extends Request {
  body: { cognitoToken: string };
}

export async function authorizeNcsaCoachController(
  req: AuthorizeNcsaCoachDto,
  res: Response,
  next: NextFunction
) {
  try {
    const { cognitoToken } = req.body;

    const coachProfile = await coachService.authorizeNcsaCoach(cognitoToken);

    if (!coachProfile) {
      return next(createError(412, `Cannot receive NCSA Coach profile`));
    }

    return res.json(coachProfile);
  } catch (e) {
    return next(e);
  }
}
