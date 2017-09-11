import request from 'supertest';
import matchers from 'jest-supertest-matchers';
import faker from 'faker';

import init from '../src/init';
import app from '../src';

describe('requests', () => {
  let server;
  let body;
  let body1;
  let userBody;
  let cookie;

  beforeAll(async () => {
    jasmine.addMatchers(matchers);
    await init(true);
  });

  beforeEach(async () => {
    body = {
      form: {
        name: faker.name.title(),
        description: 'some info',
        status: 'new',
        creator: faker.internet.email(),
        assignedTo: faker.internet.email(),
        tags: 'one,two, three, four,   five ',
      },
    };

    body1 = {
      form: {
        name: faker.name.title(),
        description: 'some info',
        status: 'new',
        creator: faker.internet.email(),
        assignedTo: faker.internet.email(),
        tags: faker.random.word(),
      },
    };

    userBody = {
      form: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      },
    };

    server = app().listen();
    await request(server)
      .post('/users')
      .send(userBody);
    const authRes = await request(server)
      .post('/sessions')
      .send(userBody);
    // console.log(authRes.headers);
    const cookies = authRes.headers['set-cookie'][0].split(',').map(item => item.split(';')[0]);
    cookie = cookies.join(';');
  });

  it('GET /tasks start', async () => {
    const res = await request(server)
      .get('/tasks?assignedTo=1%40m.ru&status=New&tag=one');
    expect(res).toHaveHTTPStatus(200);
  });

  it('GET /tasks/new', async () => {
    const res = await request(server)
      .get('/tasks/new');
    expect(res).toHaveHTTPStatus(200);
  });

  it('POST /tasks1', async () => {
    // console.log(cookie);
    const taskRes = await request(server)
      .post('/tasks')
      .set('cookie', cookie)
      .send(body);
    expect(taskRes).toHaveHTTPStatus(302);
  });

  it('POST /tasks (errors)', async () => {
    const res = await request(server)
      .post('/tasks')
      .set('cookie', cookie);
    expect(res).toHaveHTTPStatus(422);
  });

  it('GET tasks/:id/edit', async () => {
    const res1 = await request(server)
      .post('/tasks')
      .set('cookie', cookie)
      .send(body1);
    const url = res1.headers.location;
    expect(res1).toHaveHTTPStatus(302);
    const res2 = await request(server)
      .get(url);
    expect(res2).toHaveHTTPStatus(200);
  });

  it('PATCH tasks/:id', async () => {
    const res1 = await request(server)
      .post('/tasks')
      .set('cookie', cookie)
      .send(body);
    expect(res1).toHaveHTTPStatus(302);
    const url = res1.headers.location.split('/').join('/');
    const res2 = await request(server)
      .patch(url)
      .set('cookie', cookie)
      .send(body1);
    expect(res2).toHaveHTTPStatus(302);
  });

  it('PATCH tasks/:id (unproccessable entity)', async () => {
    const res1 = await request(server)
      .post('/tasks')
      .set('cookie', cookie)
      .send(body);
    expect(res1).toHaveHTTPStatus(302);
    const url = res1.headers.location.split('/').join('/');
    const res2 = await request(server)
      .patch(url);
    expect(res2).toHaveHTTPStatus(422);
  });

  it('DELETE tasks/:id', async () => {
    const res1 = await request(server)
      .post('/tasks')
      .set('cookie', cookie)
      .send(body);
    expect(res1).toHaveHTTPStatus(302);
    const url = res1.headers.location;
    const res2 = await request(server)
      .delete(url);
    expect(res2).toHaveHTTPStatus(302);
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
