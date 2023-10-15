import app from '../../src/app';

import request from 'supertest';
import {User} from '../../src/model/user';
import {Credentials, hashPassword} from '../../src/service/authService';

describe('Basic Auth Login', () => {
  const credentials: Credentials = {email: 'user@gmail.com', password: 'pass'};

  beforeEach(async () => {
    const hashedCredentials: Credentials = {...credentials, password: await hashPassword(credentials.password)};

    await new User(hashedCredentials).save();
  });

  test('Good Credentials', async () => {
    const response = await request(app).post('/api/auth/login')
      .send({email: 'user@gmail.com', password: 'pass'});

    expect(response.status).toBe(200);
  });

  test('Bad Credentials', async () => {
    const response = await request(app).post('/api/auth/login')
      .send({email: 'user@gmail.com', password: 'passd'});

    expect(response.status).toBe(401);
  });
});
