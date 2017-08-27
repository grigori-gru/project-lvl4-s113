import request from 'supertest';
import matchers from 'jest-supertest-matchers';
import faker from 'faker';

import app from '../src';
import init from '../src/init';

describe('requests', () => {
  let server;
  let body;

  beforeAll(async () => {
    jasmine.addMatchers(matchers);
    await init();
  });

  beforeEach(async () => {
    body = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    server = app().listen();
    await request(server)
      .post('/users')
      .type('form')
      .send(body);
  });

  it('POST /sessions', async () => {
    const res = await request(server)
      .post('/sessions')
      .type('form')
      .send({ email: body.email, password: body.password });
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
      .send({ email: body.email, password: body.password });
    expect(authRes).toHaveHTTPStatus(302);
    const cookie = authRes.headers['set-cookie'];

    const res = await request(server1)
      .delete('/sessions')
      .set('Cookie', cookie);
    expect(res).toHaveHTTPStatus(302);
  });

  afterEach((done) => {
    server.close();
    done();
  });

  // afterAll(async (done) => {
  //   await init(true);
  //   console.log('db reset');
  //   done();
  // });
});
