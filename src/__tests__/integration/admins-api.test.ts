import request from 'supertest';

import { app } from '../../express';

import { adminCredentials } from '../../config';

describe('Admins :: API', () => {
  test('Receive token for the system admin', async () => {
    const credentials = await request(app).post('/admins/login').send({
      email: adminCredentials.email,
      password: adminCredentials.password,
    });

    expect(credentials.status).toBe(200);
    expect(credentials.body).toHaveProperty('adminToken');
  });
});
