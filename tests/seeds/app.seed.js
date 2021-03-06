const { ObjectID } = require('mongodb');
const { User } = require('./../../models/user.js');

let loginObjects = {
  valid_user_1: {
    email: 'test2@gmail.com',
    password: 'nguyentrungtruc'
  }
};

let validUserObjects = {
  user_1: {
    fam_name: 'Dao',
    mid_name: 'Tien',
    giv_name: 'Minh',
    phone: '0123456789',
    socialIdNum: '',
    email: 'test1@gmail.com',
    password: [
      'daotienminh',
      'daotienminh'
    ],
    bankAccountNum: '',
    bankAccountName: '',
    bankCity: ''
  },
  user_2: {
    fam_name: 'Nguyen',
    mid_name: 'Trung',
    giv_name: 'Truc',
    phone: '0123987654',
    socialIdNum: '123445677',
    email: 'test2@gmail.com',
    password: 'nguyentrungtruc',
    bankAccountNum: '',
    bankAccountName: '',
    bankCity: ''
  },
  user_3: {
    fam_name: 'Tran',
    mid_name: 'Van',
    giv_name: 'Khoi',
    phone: '0123456789',
    socialIdNum: '1214343323',
    email: 'test3@gmail.com',
    password: 'tranvankhoi',
    bankAccountNum: '',
    bankAccountName: '',
    bankCity: ''
  },
};

let invalidUserObjects = {
  missingRequiredName: {
    fam_name: '',
    mid_name: '',
    giv_name: '',
    phone: '0123456789',
    socialIdNum: '',
    email: 'test1@gmail.com',
    password: [
      'daotienminh',
      'daotienminh'
    ],
    bankAccountNum: '',
    bankAccountName: '',
    bankCity: ''
  },
  missingPhone: {
    fam_name: 'minh',
    mid_name: '',
    giv_name: 'dao',
    phone: '',
    socialIdNum: '',
    email: 'test1@gmail.com',
    password: [
      'daotienminh',
      'daotienminh'
    ],
    bankAccountNum: '',
    bankAccountName: '',
    bankCity: ''
  },
  incorrectPhoneFormat: {
    fam_name: 'minh',
    mid_name: '',
    giv_name: 'dao',
    phone: '121bcb456',
    socialIdNum: '',
    email: 'test1@gmail.com',
    password: [
      'daotienminh',
      'daotienminh'
    ],
    bankAccountNum: '',
    bankAccountName: '',
    bankCity: ''
  },
  missingEmail: {
    fam_name: 'minh',
    mid_name: '',
    giv_name: 'dao',
    phone: '123456789',
    socialIdNum: '',
    email: '',
    password: [
      'daotienminh',
      'daotienminh'
    ],
    bankAccountNum: '',
    bankAccountName: '',
    bankCity: ''
  },
  invalidEmail: {
    fam_name: 'minh',
    mid_name: '',
    giv_name: 'dao',
    phone: '123456789',
    socialIdNum: '',
    email: 'minhemail.com',
    password: [
      'daotienminh',
      'daotienminh'
    ],
    bankAccountNum: '',
    bankAccountName: '',
    bankCity: ''
  },
  missingPasswords: {
    fam_name: 'minh',
    mid_name: '',
    giv_name: 'dao',
    phone: '',
    socialIdNum: '',
    email: 'test1@gmail.com',
    password: [
      '',
      ''
    ],
    bankAccountNum: '',
    bankAccountName: '',
    bankCity: ''
  }
};

// populate users
let popUsers = (done) => {
  User.remove({}).then(() => {
    let user_2 = new User(validUserObjects.user_2);
    let user_3 = new User(validUserObjects.user_3);
    user_2.genToken('auth');
    user_3.genToken('auth');
    user_2.save();
    user_3.save();
    return Promise.all([user_2, user_3]);
  }).then(() => {
    done();
  }).catch((error) => {
    console.log(error);
    done();
  });
};

let getUser = (email) => {
  return new Promise((resolve, reject) => {
    User.findOne({ 'email': email }).then((result) => {
      if (result) {
        resolve(result);
      } else {
        reject(`cannot find user with ${email}`);
      }
    });
  });
};

let getTokenFromUser = (type, user) => {
  return new Promise((resolve, reject) => {
    if (user instanceof User) {
      user.tokens.forEach((token) => {
        if (token.access === type) {
          resolve(token.token);
        }
      });
      reject('Cannot find matching type');
    }
    reject('Type is not User');
  });
};

module.exports = {
  validUserObjects,
  invalidUserObjects,
  loginObjects,
  getUser,
  getTokenFromUser,
  popUsers
};