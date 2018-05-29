const expect = require('expect');
const supertest = require('supertest');
const app = require('./../app.js').app;

let request = supertest(app);

describe('app.js GET /register', () => {
  it('should return 200', (done) => {
    request
      .get('/register')
      .expect(200)
      .end(done);
  });
});