import request from 'supertest';

import { app } from '../../express';
import MongoDb from '../../databases/mongodb';

import {
  testMongoUrl,
  mongoDb,
  mongoOptions,
  adminCredentials,
} from '../../config';

import { UserRole } from '../../services/contracts';

import tags from '../../databases/mongodb/repositories/TagsRep';
import { TagDoc } from '../../databases/mongodb/documents/tags';

import authService from '../../services/auth/AuthService';
import { tagDocA, tagDocB } from '../../mocks/tags';

import { getSubset } from '../../mocks/utils';

let adminToken = 'Undefined';
let tag: TagDoc;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { collegeId, coachId, ...tagDocACreateDto } = tagDocA;

beforeAll(async () => {
  adminToken = await authService.createToken({
    id: adminCredentials.id,
    collegeId: adminCredentials.id,
    role: UserRole.ADMIN,
  });

  await MongoDb.createConnection(testMongoUrl, mongoDb, mongoOptions);
});

afterAll(async () => {
  const mongoConnection = await MongoDb.isConnected();

  if (mongoConnection) {
    if (tag._id) {
      await tags.deleteById(tag._id);
    }

    await MongoDb.close();
  }
});

describe('Tags :: API', () => {
  test('Create tag', async () => {
    const res = await request(app)
      .post('/tags')
      .set('accept', 'application/json')
      .set('Authorization', `Bearer ${adminToken}`)
      .set('Content-Type', 'application/json')
      .send(tagDocACreateDto);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('updatedAt');

    tag = {
      ...tagDocACreateDto,
      _id: res.body._id,
      collegeId: adminCredentials.id,
      coachId: adminCredentials.id,
      updatedAt: res.body.updatedAt,
    };

    expect(res.body).toEqual(tag);
  });

  test('Get tag by _id', async () => {
    const res = await request(app)
      .get(`/tags?_id=${tag._id}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(tag);
  });

  test('Update tag', async () => {
    const updates = getSubset<Partial<TagDoc>>(tagDocB, [
      'sportId',
      'collegeId',
      'coachId',
    ]);
    updates._id = tag._id;

    const res = await request(app)
      .patch('/tags')
      .set('accept', 'application/json')
      .set('Authorization', `Bearer ${adminToken}`)
      .set('Content-Type', 'application/json')
      .send(updates);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('updatedAt');

    tag = {
      ...tag,
      ...updates,
      updatedAt: res.body.updatedAt,
    };

    expect(res.body).toEqual(tag);
  });

  test('Get college sport tags', async () => {
    const res = await request(app)
      .get(`/tags/collection/${tag.sportId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual([tag]);
  });
});
