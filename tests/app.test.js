const expect = require('expect');
const supertest = require('supertest');
const app = require('./../app.js').app;
const { validUserObjects, invalidUserObjects, loginObjects, getUser, getTokenFromUser, popUsers } = require('./seeds/app.seed.js');
const { User } = require('./../models/user.js');

let request = supertest(app);

// wipe out and populate new data inside User db
beforeEach(popUsers);

describe('app.js GET /', () => {
  it('should return 200 when accessing /', (done) => {
    request
      .get('/')
      .expect(200)
      .end(done);
  });
});

describe('app.js GET /login', () => {
  it('should return 200 when accessing GET/login', (done) => {
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
              "_inputValue": userInputs.password[0]
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
});

describe('user.js findByToken()', () => {
  it('should return user object if provided correct auth token', (done) => {
    User.findOne({ 'email': validUserObjects.user_2.email }).then((user) => {
      getTokenFromUser('auth', user).then((token) => {
        User.findByToken('auth', token).then((result) => {
          expect(result._id).toEqual(user._id);
          done();
        }, (error) => {
          console.log(error);
          done();
        });
      }, (error) => {
        console.log(error);
        done();
      });
    }, (error) => {
      console.log(error);
      done();
    });
  });
});

describe('user.js getToken()', () => {
  it('should return token for a user', (done) => {
    User.findOne({ 'email': validUserObjects.user_2.email }).then((user) => {
      user.getToken('auth').then((token) => {
        expect(token).toEqual(user.tokens[0].token);
        done();
      }).catch((error) => {
        done(error);
      });
    }).catch((error) => {
      done(error);
    });
  });
});