const { ObjectID } = require('mongodb');

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
  }
};

module.exports = {
  invalidUserObjects
};