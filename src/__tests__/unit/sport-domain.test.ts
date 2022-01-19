import { ObjectId } from 'mongodb';

import sportService from '../../services/sports/SportService';
import { SportDoc } from '../../databases/mongodb/documents/sports';

import { sportDocA, sportDocB } from '../../mocks/sports';
import { getSubset } from '../../mocks/utils';

let sport: SportDoc;

sportService.sports.createSport = jest.fn(() =>
  Promise.resolve(new ObjectId().toHexString())
);

sportService.sports.getById = jest.fn((_id) =>
  Promise.resolve({ ...sport, _id })
);

sportService.sports.updateSport = jest.fn((updates) =>
  Promise.resolve({ ...sport, ...updates })
);

describe('Domains::Tags', () => {
  it('Create tag', async () => {
    const res = await sportService.createSport(sportDocA);

    expect(res).toHaveProperty('_id');
    expect(res).toHaveProperty('updatedAt');

    sport = {
      ...sportDocA,
      _id: res._id,
      updatedAt: res.updatedAt,
    };

    expect(res).toEqual(sport);
  });

  it('Get tag', async () => {
    const res = await sportService.getSport(sport._id);

    expect(res).toHaveProperty('_id');
    expect(res).toHaveProperty('updatedAt');

    expect(res).toEqual(sport);
  });

  it('Update tag', async () => {
    const updates = getSubset<Partial<SportDoc>>(sportDocB, [
      'sportId',
      'collegeId',
      'coachId',
    ]) as Pick<SportDoc, '_id'> & Partial<SportDoc>;

    updates._id = sport._id;

    const res = await sportService.updateSport(updates);

    expect(res).toHaveProperty('updatedAt');

    const updatedSport = {
      ...sport,
      ...updates,
      updatedAt: res ? res.updatedAt : sport.updatedAt,
    };

    expect(res).toEqual(updatedSport);
  });
});
