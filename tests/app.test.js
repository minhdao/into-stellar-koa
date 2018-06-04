const expect = require('expect');
const supertest = require('supertest');
const app = require('./../app.js').app;
const { validUserObjects, invalidUserObjects, loginObjects, popUsers } = require('./seeds/app.seed.js');
const { User } = require('./../models/user.js');

let request = supertest(app);

// wipe out and populate new data inside User db
beforeEach(popUsers);

describe('app.js GET /login', () => {
  it('should return 200', (done) => {
    request
      .get('/login')
      .expect(200)
      .end(done);
  });
});

describe('app.js POST /login', () => {
  it('should return 200 if logged in successfully', (done) => {
    request
      .post('/login')
      .send(loginObjects.valid_user_1)
      .expect(200)
      .end(done);
  });
});

describe('app.js GET /register', () => {
  it('should return 200', (done) => {
    request
      .get('/register')
      .expect(200)
      .end(done);
  });
});

describe('app.js POST /register', () => {
  it('should create user in db and return 200 for request if inputs are valid', (done) => {
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
          console.log('found user');
          done();
        }).catch((error) => {
          console.log('cannot find user');
          done();
        });
      });
  });

  it('should return 400 and error body for request without any of required names', (done) => {
    let userInputs = invalidUserObjects.missingRequiredName;
    request
      .post('/register')
      .send(userInputs)
      .expect(400)
      .expect((res) => {
        expect(res.body).toEqual({
          "_validInputs": [{
              "isValid": true,
              "message": "Looks good :)",
              "color": "green",
              "_inputID": "email",
              "_inputValue": userInputs.email
            },
            {
              "isValid": true,
              "message": "Looks good :)",
              "color": "green",
              "_inputID": "phone",
              "_inputValue": userInputs.phone
            },
            {
              "isValid": true,
              "message": "Looks good :)",
              "color": "green",
              "_inputID": "password",
              "_inputValue": ""
            }
          ],
          "_inValidInputs": [{
              "isValid": false,
              "message": "Such empty :(",
              "color": "red",
              "_inputID": "fam_name",
              "_inputValue": ""
            },
            {
              "isValid": false,
              "message": "Such empty :(",
              "color": "red",
              "_inputID": "giv_name",
              "_inputValue": ""
            }
          ]
        });
      })
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