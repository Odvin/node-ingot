import colleges, {
  Colleges,
} from '../../databases/mongodb/repositories/CollegesRep';

import { CollegeDoc } from '../../databases/mongodb/documents/colleges';

export class CollegeService {
  constructor(public colleges: Colleges) {}

  async createCollege(collegeDoc: Omit<CollegeDoc, '_id' | 'updatedAt'>) {
    const updatedAt = new Date();

    const _id = await this.colleges.createCollege({
      ...collegeDoc,
      updatedAt,
    });

    const doc: CollegeDoc = { ...collegeDoc, _id, updatedAt };

    return doc;
  }

  async getCollege(_id: CollegeDoc['_id']) {
    return this.colleges.getById(_id);
  }

  async updateCollege(
    collegeDoc: Pick<CollegeDoc, '_id'> & Partial<CollegeDoc>
  ) {
    const doc = await this.colleges.getById(collegeDoc._id);

    if (!doc) return null;

    const updatedAt = new Date();

    return this.colleges.updateCollege({ ...collegeDoc, updatedAt });
  }
}

export default new CollegeService(colleges);
