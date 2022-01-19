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

import { SportDoc } from '../../databases/mongodb/documents/sports';

import sports from '../../databases/mongodb/repositories/SportsRep';

import authService from '../../services/auth/AuthService';

import { sportDocA, sportDocB } from '../../mocks/sports';

import { getSubset } from '../../mocks/utils';

let adminToken = 'Undefined';
let sport: SportDoc;

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
    if (sport._id) {
      await sports.deleteById(sport._id);
    }

    await MongoDb.close();
  }
});

describe('Sport :: API', () => {
  test('Create sport', async () => {
    const res = await request(app)
      .post('/sports')
      .set('accept', 'application/json')
      .set('Authorization', `Bearer ${adminToken}`)
      .set('Content-Type', 'application/json')
      .send(sportDocA);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('updatedAt');

    sport = {
      ...sportDocA,
      _id: res.body._id,
      updatedAt: res.body.updatedAt,
    };

    expect(res.body).toEqual(sport);
  });

  test('Get sport by _id', async () => {
    const res = await request(app)
      .get(`/sports?_id=${sport._id}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(sport);
  });

  test('Update sport', async () => {
    const updates = getSubset<Partial<SportDoc>>(sportDocB);
    updates._id = sport._id;

    const res = await request(app)
      .patch('/sports')
      .set('accept', 'application/json')
      .set('Authorization', `Bearer ${adminToken}`)
      .set('Content-Type', 'application/json')
      .send(updates);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('updatedAt');

    const updatedSport = {
      ...sport,
      ...updates,
      updatedAt: res.body.updatedAt,
    };

    expect(res.body).toEqual(updatedSport);
  });
});
