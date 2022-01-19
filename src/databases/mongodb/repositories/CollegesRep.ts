import collegeSeeds from '../seeds/colleges.json';

import Repository from './Repository';
import { CollegeDoc, CollegeDocument } from '../documents/colleges';
// import { CollegeDocument } from '../../../domains/contracts';
import { OptionalId, ObjectId } from 'mongodb';

export class Colleges extends Repository<CollegeDocument> {
  constructor(collectionName: string) {
    super(collectionName);
  }

  private getCollegeDoc(collegeDocument: CollegeDocument): CollegeDoc {
    return {
      ...collegeDocument,
      _id: collegeDocument._id.toHexString(),
    };
  }

  async createCollege(collegeDoc: Omit<CollegeDoc, '_id'>) {
    const collegeId = await this.create(collegeDoc);
    return collegeId.toHexString();
  }

  async getById(_id: CollegeDoc['_id']) {
    const doc = await this.findOne({ _id: new ObjectId(_id) });
    return doc ? this.getCollegeDoc(doc) : null;
  }

  async updateCollege(
    collegeDoc: Pick<CollegeDoc, '_id'> & Partial<CollegeDoc>
  ) {
    const { _id, ...updates } = collegeDoc;
    const doc = await this.update(
      { _id: new ObjectId(_id) },
      { $set: updates }
    );
    return doc ? this.getCollegeDoc(doc) : null;
  }

  async deleteById(_id: CollegeDoc['_id']) {
    return this.deleteOne({ _id: new ObjectId(_id) });
  }

  async getByIpedsId(ipedsId: CollegeDoc['ipedsId']) {
    const doc = await this.findOne(
      { ipedsId },
      { projection: { title: 1, shortTitle: 1 } }
    );
    return doc ? this.getCollegeDoc(doc) : null;
  }

  async seed(): Promise<{ ok: number; n: number }> {
    await this.deleteMany({});

    const collegeDocs = collegeSeeds.map((college) => ({
      ...college,
      updatedAt: new Date(),
    })) as OptionalId<CollegeDocument>[];

    return this.createMany(collegeDocs);
  }
}

export default new Colleges('colleges');
