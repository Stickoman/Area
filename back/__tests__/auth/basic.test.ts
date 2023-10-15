import app from '../../src/app';

import request from 'supertest';
import {User} from '../../src/model/user';
import {Credentials, hashPassword} from '../../src/service/authService';

const USER_CREDENTIALS: Credentials = {
  email: 'user@gmail.com',
  password: 'password!',
};

async function saveUser(credentials: Credentials) {
  const hashedCredentials: Credentials = {
    ...credentials,
    password: await hashPassword(credentials.password),
  };

  await new User(hashedCredentials).save();
}

describe('Basic Auth Login', () => {
  beforeEach(async () => {
    await saveUser(USER_CREDENTIALS);
  });

  test('Good Credentials', async () => {
    const response = await request(app).post('/api/auth/login')
      .send(USER_CREDENTIALS);

    expect(response.status).toBe(200);
  });

  test('Bad Credentials', async () => {
    const response = await request(app).post('/api/auth/login')
      .send({email: USER_CREDENTIALS.email, password: 'bad_password'});

    expect(response.status).toBe(401);
  });
});

describe('Basic Auth Register', () => {
  test('Register New User', async () => {
    const response = await request(app).post('/api/auth/register')
      .send(USER_CREDENTIALS);

    expect(response.status).toBe(201);
  });

  test('Register Bad User', async () => {
    const passwords: string[] = ['pass', '123456.', 'pass@'];

    for (const password of passwords) {
      const response = await request(app).post('/api/auth/register')
        .send({...USER_CREDENTIALS, password});

      expect(response.status).toBe(403);
    }
  });

  test('Register Existing User', async () => {
    await saveUser(USER_CREDENTIALS);

    const response = await request(app).post('/api/auth/register')
      .send(USER_CREDENTIALS);

    expect(response.status).toBe(403);
  });
});
