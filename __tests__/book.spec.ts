const request = require('supertest');
import app from '../src/app';

describe('GET /book', () => {
  it('should return 200 OK', () => {
    console.log('test');
    return request(app)
      .get('/book')
      .expect(200);
  });
});
