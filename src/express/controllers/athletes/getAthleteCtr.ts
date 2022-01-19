import { Request, Response, NextFunction } from 'express';

import athleteService from '../../../services/athletes/AthleteService';

export async function getAthleteCtr(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const athleteId = 10;

    const athlete = await athleteService.getAthlete(athleteId);

    res.json(athlete);
  } catch (e) {
    return next(e);
  }
}
