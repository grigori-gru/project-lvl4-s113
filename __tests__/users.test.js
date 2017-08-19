import request from 'supertest'; // eslint-disable-line
import matchers from 'jest-supertest-matchers'; // eslint-disable-line

import app from '../src';

describe('requests', () => {
  let server;

  beforeAll(() => {
    jasmine.addMatchers(matchers);
  });

  beforeEach(() => {
    server = app().listen();
  });

  const body = {
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'newemail@mail.ru',
    password: 'password',
  };

  const body1 = {
    firstName: 'firstName1',
    lastName: 'lastName2',
    email: 'newemail1@mail.ru',
    password: 'password2',
  };

  it('GET /', async () => {
    const res = await request(server)
      .get('/');
    expect(res).toHaveHTTPStatus(200);
  });


  it('GET error', async () => {
    const res = await request(server)
      .get('/error');
    expect(res).toHaveHTTPStatus(404);
  });

  it('GET /users/new', async () => {
    const res = await request(server)
      .get('/users/new');
    expect(res).toHaveHTTPStatus(200);
  });

  it('POST /users', async () => {
    const res = await request(server)
      .post('/users')
      .type('form')
      .send(body);
    expect(res).toHaveHTTPStatus(302);
  });

  it('POST /users (errors)', async () => {
    const res = await request(server)
      .post('/users');
    expect(res).toHaveHTTPStatus(422);
  });

  it('GET users/:id/edit', async () => {
    const res1 = await request(server)
      .post('/users')
      .type('form')
      .send(body1);
    const url = res1.headers.location;
    expect(res1).toHaveHTTPStatus(302);
    const res2 = await request(server)
      .get(url);
    expect(res2).toHaveHTTPStatus(200);
  });

  it('PATCH users/:id', async () => {
    const res1 = await request(server)
      .post('/users')
      .type('form')
      .send(body);
    expect(res1).toHaveHTTPStatus(302);
    const url = res1.headers.location.split('/').join('/');
    const res2 = await request(server)
      .patch(url)
      .type('form')
      .send(body1);
    expect(res2).toHaveHTTPStatus(302);
  });

  it('PATCH users/:id (unproccessable entity)', async () => {
    const res1 = await request(server)
      .post('/users')
      .type('form')
      .send(body);
    expect(res1).toHaveHTTPStatus(302);
    const url = res1.headers.location.split('/').join('/');
    const res2 = await request(server)
      .patch(url);
    expect(res2).toHaveHTTPStatus(422);
  });

  // it('DELETE users/:id', async () => {
  //   const res1 = await request(server)
  //     .post('/users')
  //     .type('form')
  //     .send(body);
  //   expect(res1).toHaveHTTPStatus(302);
  //   const url = res1.headers.location.split('/').join('/');
  //   const res2 = await request(server)
  //     .delete(url);
  //   expect(res2).toHaveHTTPStatus(302);
  // });

  afterEach((done) => {
    server.close();
    done();
  });
});
