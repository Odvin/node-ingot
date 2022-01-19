import { ObjectId } from 'mongodb';

import Repository from './Repository';
import { AthleteDocument, AthleteDoc } from '../documents/athletes';

import { createMockAthlete } from '../../../mocks/athletes';

export class Athletes extends Repository<AthleteDocument> {
  constructor(collectionName: string) {
    super(collectionName);
  }

  private getAthleteDoc(athleteDocument: AthleteDocument): AthleteDoc {
    return {
      ...athleteDocument,
      _id: athleteDocument._id.toHexString(),
    };
  }

  async createAthlete(
    athleteDoc: Omit<AthleteDoc, '_id'>
  ): Promise<AthleteDoc['_id']> {
    const athleteId = await this.create(athleteDoc);
    return athleteId.toHexString();
  }

  async getByIds(ids: string[]) {
    const _ids = ids.map((id) => new ObjectId(id));
    const cursor = this.find({ _id: { $in: _ids } });
    const athletes: AthleteDocument[] = await cursor.toArray();
    await cursor.close();
    return athletes.map((athlete) => this.getAthleteDoc(athlete));
  }

  async seed(): Promise<{ ok: number; n: number }> {
    await this.deleteMany({});

    const athletes: AthleteDoc[] = [];

    for (let i = 0; i < 20; i++) {
      athletes.push(createMockAthlete());
    }

    return this.createMany(
      athletes.map((athlete) => ({
        ...athlete,
        _id: new ObjectId(athlete._id),
      }))
    );
  }
}

export default new Athletes('athletes');
