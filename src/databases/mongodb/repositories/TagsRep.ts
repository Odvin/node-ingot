import { ObjectId } from 'mongodb';
import Repository from './Repository';
import { TagDoc, TagDocument } from '../documents/tags';

export class Tags extends Repository<TagDocument> {
  constructor(collectionName: string) {
    super(collectionName);
  }

  private getTagDoc(tagDocument: TagDocument): TagDoc {
    return {
      ...tagDocument,
      _id: tagDocument._id.toHexString(),
      collegeId: tagDocument.collegeId.toHexString(),
      sportId: tagDocument.sportId.toHexString(),
      coachId: tagDocument.coachId.toHexString(),
    };
  }

  async createTag(tagDoc: Omit<TagDoc, '_id'>) {
    const tagDocument = {
      ...tagDoc,
      collegeId: new ObjectId(tagDoc.collegeId),
      sportId: new ObjectId(tagDoc.sportId),
      coachId: new ObjectId(tagDoc.coachId),
    };
    const tagId = await this.create(tagDocument);
    return tagId.toHexString();
  }

  async deleteById(_id: TagDoc['_id']) {
    return this.deleteOne({ _id: new ObjectId(_id) });
  }

  async getById(tagId: TagDoc['_id']) {
    const doc = await this.findOne({ _id: new ObjectId(tagId) });
    return doc ? this.getTagDoc(doc) : null;
  }

  async updateTag(tagDoc: Pick<TagDoc, '_id'> & Partial<TagDoc>) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, collegeId, sportId, coachId, ...updates } = tagDoc;
    const doc = await this.update(
      { _id: new ObjectId(_id) },
      { $set: updates }
    );
    return doc ? this.getTagDoc(doc) : null;
  }

  async getCollegeSportTags(searchParams: {
    collegeId: TagDoc['collegeId'];
    sportId: TagDoc['sportId'];
  }) {
    const { collegeId, sportId } = searchParams;
    const cursor = this.find({
      collegeId: new ObjectId(collegeId),
      sportId: new ObjectId(sportId),
    });
    const tags: TagDocument[] = await cursor.toArray();
    await cursor.close();

    const tagDocs = tags.map((tag) => this.getTagDoc(tag));
    return tagDocs;
  }
}

export default new Tags('tags');
