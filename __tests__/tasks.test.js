import request from 'supertest';
import matchers from 'jest-supertest-matchers';
import faker from 'faker';

import init from '../src/init';
import app from '../src';

describe('requests', () => {
  let server;
  let body;
  let body1;
  beforeAll(async () => {
    jasmine.addMatchers(matchers);
    await init(true);
  });

  beforeEach(() => {
    body = {
      name: faker.name.title(),
      description: 'some info',
      status: 'new',
      creator: faker.name.firstName(),
      assignedTo: faker.name.firstName(),
      tags: faker.random.word(),
    };

    body1 = {
      name: faker.name.title(),
      description: 'some info',
      status: 'on the go',
      creator: faker.name.firstName(),
      assignedTo: faker.name.firstName(),
      tags: faker.random.word(),
    };
    server = app().listen();
  });


  it('GET /tasks/new', async () => {
    const res = await request(server)
      .get('/tasks/new');
    expect(res).toHaveHTTPStatus(200);
  });

  it('POST /tasks', async () => {
    const res = await request(server)
      .post('/tasks')
      
      .send(body);
    expect(res).toHaveHTTPStatus(302);
  });

  it('POST /tasks (errors)', async () => {
    const res = await request(server)
      .post('/tasks');
    expect(res).toHaveHTTPStatus(422);
  });

  it('GET tasks/:id/edit', async () => {
    const res1 = await request(server)
      .post('/tasks')
      
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
      
      .send(body);
    expect(res1).toHaveHTTPStatus(302);
    const url = res1.headers.location.split('/').join('/');
    const res2 = await request(server)
      .patch(url)
      
      .send(body1);
    expect(res2).toHaveHTTPStatus(302);
  });

  it('PATCH tasks/:id (unproccessable entity)', async () => {
    const res1 = await request(server)
      .post('/tasks')
      
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
