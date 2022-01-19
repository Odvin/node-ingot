import { Request, Response, NextFunction } from 'express';

export function liveness(req: Request, res: Response, next: NextFunction) {
  try {
    return res.sendStatus(200);
  } catch (e) {
    return next(e);
  }
}
