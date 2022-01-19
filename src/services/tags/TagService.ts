import tags, { Tags } from '../../databases/mongodb/repositories/TagsRep';
import { TagDoc } from '../../databases/mongodb/documents/tags';

export class TagService {
  constructor(public tags: Tags) {}

  async createTag(tagDoc: Omit<TagDoc, '_id' | 'updatedAt'>) {
    const updatedAt = new Date();

    const _id = await this.tags.createTag({ ...tagDoc, updatedAt });

    const doc: TagDoc = { ...tagDoc, _id, updatedAt };

    return doc;
  }

  async getTag(_id: TagDoc['_id']) {
    return this.tags.getById(_id);
  }

  async getCollegeSportTags(searchParams: {
    collegeId: TagDoc['collegeId'];
    sportId: TagDoc['sportId'];
  }) {
    return this.tags.getCollegeSportTags(searchParams);
  }

  async updateTag(
    tagDoc: Pick<TagDoc, '_id' | 'coachId' | 'collegeId' | 'sportId'> &
      Partial<TagDoc>
  ) {
    const doc = await this.tags.getById(tagDoc._id);

    if (!doc) {
      return null;
    }

    const { coachId, collegeId, ...updates } = tagDoc;

    // Coach has to update only their own tags
    if (coachId !== doc.coachId || collegeId !== doc.collegeId) {
      return null;
    }

    const updatedAt = new Date();

    return this.tags.updateTag({ ...updates, updatedAt });
  }
}

export default new TagService(tags);
