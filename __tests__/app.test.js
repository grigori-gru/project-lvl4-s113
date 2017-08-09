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
    const res1 = await query.get('/');
    expect(res1).toHaveHTTPStatus(200);
  });

  it('GET error', async () => {
    const query = request(server);
    const res1 = await query.get('error');
    expect(res1).toHaveHTTPStatus(404);
  });

  afterEach((done) => {
    server.close();
    done();
  });
});
