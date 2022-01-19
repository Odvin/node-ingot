import { Request, Response, NextFunction } from 'express';
import MongoDb from '../../../databases/mongodb';
import Elastic from '../../../databases/elastic';

export async function readiness(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const mongoConnection = await MongoDb.isConnected();
    const elasticConnection = await Elastic.isConnected();

    if (mongoConnection && elasticConnection) {
      return res.sendStatus(200);
    }

    return res.sendStatus(503);
  } catch (e) {
    return next(e);
  }
}
