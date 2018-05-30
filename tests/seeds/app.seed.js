const { ObjectID } = require('mongodb');

let validUserObjects = {
  user_1: {
    fam_name: 'minh',
    mid_name: '',
    giv_name: 'dao',
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

module.exports = {
  validUserObjects,
  invalidUserObjects
};