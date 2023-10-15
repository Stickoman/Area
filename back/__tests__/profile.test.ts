import app from '../src/app';

import request from 'supertest';
import {saveUser, USER_CREDENTIALS} from './common/user';
import {generateAccessToken} from '../src/middleware/auth';
import {IUser} from '../src/model/user';

describe('Profile Details', () => {
  test('Unauthorized Call', async () => {
    const response = await request(app).get('/api/me');

    expect(response.status).toBe(401);
  });

  test('Retrieve Profile Details', async () => {
    const user: IUser = await saveUser(USER_CREDENTIALS);
    const jwt: string = generateAccessToken(user);
    const response = await request(app).get('/api/me')
      .set({authorization: `Bearer ${jwt}`});

    expect(response.status).toBe(200);
    expect(response.body.email).toBe(USER_CREDENTIALS.email);
  });
});
