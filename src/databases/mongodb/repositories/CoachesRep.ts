import { ObjectId } from 'mongodb';

import Repository from './Repository';
import { CoachDocument, CoachDoc } from '../documents/coaches';

export class Coaches extends Repository<CoachDocument> {
  constructor(collectionName: string) {
    super(collectionName);
  }

  private getCoachDoc(coachDocument: CoachDocument): CoachDoc {
    return {
      ...coachDocument,
      _id: coachDocument._id.toHexString(),
      pinnedTags: coachDocument.pinnedTags
        ? coachDocument.pinnedTags.map((tag) => tag.toHexString())
        : [],
    };
  }

  async createCoach(coachDoc: Omit<CoachDoc, '_id'>): Promise<CoachDoc['_id']> {
    const pinnedTags = coachDoc.pinnedTags.map((tag) => new ObjectId(tag));
    const coachId = await this.create({ ...coachDoc, pinnedTags });
    return coachId.toHexString();
  }

  async getById(coachId: CoachDoc['_id']) {
    const doc = await this.findOne({ _id: new ObjectId(coachId) });
    return doc ? this.getCoachDoc(doc) : null;
  }

  async updateCoach(coachDoc: Omit<CoachDoc, 'pinnedTags'>) {
    const { _id, ...updates } = coachDoc;
    updates.updatedAt = new Date();

    const doc = await this.update(
      { _id: new ObjectId(_id) },
      { $set: updates }
    );

    return doc ? this.getCoachDoc(doc) : null;
  }

  async setPinnedTags(
    coachId: CoachDoc['_id'],
    pinTags: CoachDoc['pinnedTags']
  ): Promise<string[]> {
    const _id = new ObjectId(coachId);
    const updates = pinTags.map((tag) => new ObjectId(tag));

    const coachDoc = await this.update(
      { _id },
      { $set: { pinnedTags: updates } }
    );

    return coachDoc?.pinnedTags
      ? coachDoc.pinnedTags.map((tag) => tag.toHexString())
      : [];
  }

  async getByEmail(email: CoachDoc['email']) {
    const doc = await this.findOne({ email });
    return doc ? this.getCoachDoc(doc) : null;
  }
}

export default new Coaches('coaches');
