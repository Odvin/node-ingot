import { Request, Response, NextFunction } from 'express';
import { serviceName } from '../../../config';

export function serviceInfo(req: Request, res: Response, next: NextFunction) {
  try {
    return res.send(serviceName);
  } catch (e) {
    return next(e);
  }
}
