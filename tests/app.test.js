const expect = require('expect');
const supertest = require('supertest');
const app = require('./../app.js').app;
const { invalidUserObjects } = require('./seeds/app.seed.js');

let request = supertest(app);

describe('app.js GET /register', () => {
  it('should return 200', (done) => {
    request
      .get('/register')
      .expect(200)
      .end(done);
  });
});

describe('app.js POST /register', () => {
  it('should reject 400 request without any of required names', (done) => {

  });

  it('should reject 400 request without a phone number', (done) => {

  });

  it('should reject 400 request with wrong phone number format', (done) => {

  });

  it('should reject 400 request with wrong phone number format', (done) => {

  });

  it('should reject 400 request without email', (done) => {

  });

  it('should reject 400 request for email with wrong format', (done) => {

  });

  it('should reject 400 request for email already exist in DB', (done) => {

  });

  it('should reject 400 request without any of passwords', (done) => {

  });

  it('should reject 400 request with passwords not matching', (done) => {

  });

});