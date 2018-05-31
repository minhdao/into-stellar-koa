const expect = require('expect');
const supertest = require('supertest');
const app = require('./../app.js').app;
const { validUserObjects, invalidUserObjects, popUsers } = require('./seeds/app.seed.js');
const { User } = require('./../models/user.js');

let request = supertest(app);

// wipe out and populate new data inside User db
beforeEach(popUsers);

describe('app.js GET /register', () => {
  it('should return 200', (done) => {
    request
      .get('/register')
      .expect(200)
      .end(done);
  });
});

describe('app.js POST /register', () => {
  it('should return 200 for request with all correct inputs', (done) => {
    request
      .post('/register')
      .send(validUserObjects.user_1)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        // check if user saved in db successfully - find by email
        User.find({ 'email': validUserObjects.user_1.email }).then(() => {
          done();
        }).catch((error) => {
          done();
        });
      });
  });

  it('should return 400 request without any of required names', (done) => {
    request
      .post('/register')
      .send(invalidUserObjects.missingRequiredName)
      .expect(400)
      .end(done);
  });
  //
  // it('should reject 400 request without a phone number', (done) => {
  //   request
  //     .post('/register')
  //     .send(invalidUserObjects.missingPhone)
  //     .expect(400)
  //     .end(done);
  // });
  //
  // it('should reject 400 request with wrong phone number format', (done) => {
  //   request
  //     .post('/register')
  //     .send(invalidUserObjects.incorrectPhoneFormat)
  //     .expect(400)
  //     .end(done);
  // });
  //
  // it('should reject 400 request without email', (done) => {
  //   request
  //     .post('/register')
  //     .send(invalidUserObjects.missingEmail)
  //     .expect(400)
  //     .end(done);
  // });
  //
  // it('should reject 400 request for email with wrong format', (done) => {
  //   request
  //     .post('/register')
  //     .send(invalidUserObjects.invalidEmail)
  //     .expect(400)
  //     .end(done);
  // });

  // it('should reject 400 request for email already exist in DB', (done) => {
  //
  // });
  //
  // it('should reject 400 request without any of passwords', (done) => {
  //
  // });
  //
  // it('should reject 400 request with passwords not matching', (done) => {
  //
  // });

});