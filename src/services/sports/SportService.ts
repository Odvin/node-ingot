import sports, { Sports } from '../../databases/mongodb/repositories/SportsRep';

import { SportDoc } from '../../databases/mongodb/documents/sports';

export class SportService {
  constructor(public sports: Sports) {}

  async createSport(sportDoc: Omit<SportDoc, '_id' | 'updatedAt'>) {
    const updatedAt = new Date();

    const _id = await this.sports.createSport({ ...sportDoc, updatedAt });

    const doc: SportDoc = { ...sportDoc, _id, updatedAt };

    return doc;
  }

  async getSport(_id: SportDoc['_id']) {
    return this.sports.getById(_id);
  }

  async updateSport(sportDoc: Pick<SportDoc, '_id'> & Partial<SportDoc>) {
    const doc = await this.sports.getById(sportDoc._id);

    if (!doc) return null;

    const updatedAt = new Date();

    return this.sports.updateSport({ ...sportDoc, updatedAt });
  }
}

export default new SportService(sports);
