import app from '../src/app';

import request from 'supertest';

describe('API Basic Call', () => {
  test('Ping Call', async () => {
    const response = await request(app).get('/api/ping');

    expect(response.status).toBe(200);
    expect(response.text).toBe('Pong');
  });

  test('Database Connection', async () => {
    const response = await request(app).get('/api/status');

    expect(response.status).toBe(200);
  });
});
