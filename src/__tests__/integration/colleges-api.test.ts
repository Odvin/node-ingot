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

import colleges from '../../databases/mongodb/repositories/CollegesRep';

import authService from '../../services/auth/AuthService';

import { collegeDocA, collegeDocB } from '../../mocks/colleges';

import { getSubset } from '../../mocks/utils';
import { CollegeDoc } from '../../databases/mongodb/documents/colleges';

let adminToken = 'Undefined';
let college: CollegeDoc;

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
    if (college._id) {
      await colleges.deleteById(college._id);
    }

    await MongoDb.close();
  }
});

describe('Colleges :: API', () => {
  test('Create college', async () => {
    const res = await request(app)
      .post('/colleges')
      .set('accept', 'application/json')
      .set('Authorization', `Bearer ${adminToken}`)
      .set('Content-Type', 'application/json')
      .send(collegeDocA);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('updatedAt');

    college = {
      ...collegeDocA,
      _id: res.body._id,
      updatedAt: res.body.updatedAt,
    };

    expect(res.body).toEqual(college);
  });

  test('Get college by _id', async () => {
    const res = await request(app)
      .get(`/colleges?_id=${college._id}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(college);
  });

  test('Update college', async () => {
    const updates = getSubset<Partial<CollegeDoc>>(collegeDocB);
    updates._id = college._id;

    const res = await request(app)
      .patch('/colleges')
      .set('accept', 'application/json')
      .set('Authorization', `Bearer ${adminToken}`)
      .set('Content-Type', 'application/json')
      .send(updates);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('updatedAt');

    const updatedCollege = {
      ...college,
      ...updates,
      updatedAt: res.body.updatedAt,
    };

    expect(res.body).toEqual(updatedCollege);
  });
});
