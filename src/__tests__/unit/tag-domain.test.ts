import { ObjectId } from 'mongodb';

import tagService from '../../services/tags/TagService';
import { TagDoc } from '../../databases/mongodb/documents/tags';

import { tagDocA, tagDocB } from '../../mocks/tags';
import { getSubset } from '../../mocks/utils';

let tag: TagDoc;

tagService.tags.createTag = jest.fn(() =>
  Promise.resolve(new ObjectId().toHexString())
);

tagService.tags.getById = jest.fn((_id) => Promise.resolve({ ...tag, _id }));

tagService.tags.updateTag = jest.fn((updates) =>
  Promise.resolve({ ...tag, ...updates })
);

describe('Domains::Tags', () => {
  it('Create tag', async () => {
    const res = await tagService.createTag(tagDocA);

    expect(res).toHaveProperty('_id');
    expect(res).toHaveProperty('updatedAt');

    tag = {
      ...tagDocA,
      _id: res._id,
      updatedAt: res.updatedAt,
    };

    expect(res).toEqual(tag);
  });

  it('Get tag', async () => {
    const res = await tagService.getTag(tag._id);

    expect(res).toHaveProperty('_id');
    expect(res).toHaveProperty('updatedAt');

    expect(res).toEqual(tag);
  });

  it('Update tag', async () => {
    const updates = getSubset<Partial<TagDoc>>(tagDocB, [
      'sportId',
      'collegeId',
      'coachId',
    ]) as Pick<TagDoc, '_id' | 'coachId' | 'collegeId' | 'sportId'> &
      Partial<TagDoc>;

    updates._id = tag._id;
    updates.coachId = tag.coachId;
    updates.collegeId = tag.collegeId;

    const res = await tagService.updateTag(updates);

    expect(res).toHaveProperty('updatedAt');

    const updatedTag = {
      ...tag,
      ...updates,

      updatedAt: res ? res.updatedAt : tag.updatedAt,
    };

    expect(res).toEqual(updatedTag);
  });
});
