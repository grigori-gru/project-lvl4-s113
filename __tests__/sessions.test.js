import request from 'supertest';
import matchers from 'jest-supertest-matchers';

import app from '../src';

describe('requests', () => {
  let server;

  beforeAll(() => {
    jasmine.addMatchers(matchers);
  });

  beforeEach(() => {
    server = app().listen();
  });

  it('POST /sessions', async () => {
    const res = await request(server)
      .post('/sessions')
      .type('form')
      .send({ email: 'email@mail.ru', password: 'qwerty' });
    expect(res).toHaveHTTPStatus(302);
  });

  it('POST /sessions (errors)', async () => {
    const res = await request(server)
      .post('/sessions')
      .type('form')
      .send({ email: 'email@mail.ru', password: 'qwery' });
    expect(res).toHaveHTTPStatus(422);
  });

  it('DELETE /sessions', async () => {
    const server1 = app().listen();
    const authRes = await request(server)
      .post('/sessions')
      .type('form')
      .send({ email: 'email@mail.ru', password: 'qwerty' });
    expect(authRes).toHaveHTTPStatus(302);
    const cookie = authRes.headers['set-cookie'];

    const res = await request(server1)
      .delete('/sessions')
      .set('Cookie', cookie);
    expect(res).toHaveHTTPStatus(302);
  });
});
