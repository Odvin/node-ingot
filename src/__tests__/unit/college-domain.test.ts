import { ObjectId } from 'mongodb';
import collegeService from '../../services/colleges/CollegeService';
import { CollegeDoc } from '../../databases/mongodb/documents/colleges';

import { collegeDocA, collegeDocB } from '../../mocks/colleges';
import { getSubset } from '../../mocks/utils';

let college: CollegeDoc;

collegeService.colleges.createCollege = jest.fn(() =>
  Promise.resolve(new ObjectId().toHexString())
);

collegeService.colleges.getById = jest.fn((_id) =>
  Promise.resolve({ ...college, _id })
);

collegeService.colleges.updateCollege = jest.fn((updates) =>
  Promise.resolve({ ...college, ...updates })
);

describe('Domains::Colleges', () => {
  it('Create college', async () => {
    const res = await collegeService.createCollege(collegeDocA);

    expect(res).toHaveProperty('_id');
    expect(res).toHaveProperty('updatedAt');

    college = {
      ...collegeDocA,
      _id: res._id,
      updatedAt: res.updatedAt,
    };

    expect(res).toEqual(college);
  });

  it('Get college', async () => {
    const res = await collegeService.getCollege(college._id);

    expect(res).toHaveProperty('_id');
    expect(res).toHaveProperty('updatedAt');

    expect(res).toEqual(college);
  });

  it('Update college', async () => {
    const updates = getSubset<Partial<CollegeDoc>>(collegeDocB) as Pick<
      CollegeDoc,
      '_id'
    > &
      Partial<CollegeDoc>;
    updates._id = college._id;

    const res = await collegeService.updateCollege(updates);

    expect(res).toHaveProperty('updatedAt');

    const updatedCollege = {
      ...college,
      ...updates,
      updatedAt: res ? res.updatedAt : college.updatedAt,
    };

    expect(res).toEqual(updatedCollege);
  });
});
