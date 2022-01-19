import sportSeeds from '../seeds/sports.json';

import Repository from './Repository';
import { ObjectId, OptionalId } from 'mongodb';

import { SportDocument, SportDoc } from '../documents/sports';

export class Sports extends Repository<SportDocument> {
  constructor(collectionName: string) {
    super(collectionName);
  }

  private getSportDoc(sportDocument: SportDocument): SportDoc {
    return {
      ...sportDocument,
      _id: sportDocument._id.toHexString(),
    };
  }

  async createSport(sportDoc: Omit<SportDoc, '_id'>) {
    const sportId = await this.create(sportDoc);
    return sportId.toHexString();
  }

  async getById(sportId: SportDoc['_id']) {
    const doc = await this.findOne({ _id: new ObjectId(sportId) });
    return doc ? this.getSportDoc(doc) : null;
  }

  async updateSport(sportDoc: Pick<SportDoc, '_id'> & Partial<SportDoc>) {
    const { _id, ...updates } = sportDoc;
    const doc = await this.update(
      { _id: new ObjectId(_id) },
      { $set: updates }
    );
    return doc ? this.getSportDoc(doc) : null;
  }

  async getByNcsaIds(ncsaIds: SportDoc['ncsaId'][]) {
    const cursor = this.find({ ncsaId: { $in: ncsaIds } });
    const sports: SportDocument[] = await cursor.toArray();
    await cursor.close();
    return sports.map((sport) => this.getSportDoc(sport));
  }

  async deleteById(_id: SportDoc['_id']) {
    return this.deleteOne({ _id: new ObjectId(_id) });
  }

  async seed(): Promise<{ ok: number; n: number }> {
    await this.deleteMany({});

    const sportDocs = sportSeeds.map((sport) => ({
      ...sport,
      updatedAt: new Date(),
    })) as OptionalId<SportDocument>[];

    return this.createMany(sportDocs);
  }
}

export default new Sports('sports');
