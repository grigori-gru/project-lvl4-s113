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

  it('GET /', async () => {
    const query = request(server);
    const res = await query.get('/');
    expect(res).toHaveHTTPStatus(200);
  });

  it('GET error', async () => {
    const query = request(server);
    const res = await query.get('/error');
    expect(res).toHaveHTTPStatus(404);
  });

  afterEach((done) => {
    server.close();
    done();
  });
});
