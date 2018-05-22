const mongoose = require('mongoose');
const validator = require('validator');

/**
 * Define User schema
 */
var UserSchema = new mongoose.Schema({
  giv_name: {
    type: String,
    required: true,
    minLength: 1,
    trim: true,
    unique: false,
  },
  mid_name: {
    type: String,
    required: false,
    minLength: 1,
    trim: true,
    unique: false,
  },
  fam_name: {
    type: String,
    required: true,
    minLength: 1,
    trim: true,
    unique: false,
  },
  phone: {
    type: Number,
    required: true,
    minLength: 1,
    trim: true,
    unique: false,
  },
  socialIdNum: {
    type: String,
    required: false,
    minLength: 1,
    trim: true,
    unique: true,
  },
  bankName: {
    type: String,
    required: false,
    minLength: 1,
    trim: true,
    unique: false,
  },
  bankAccountNum: {
    type: String,
    required: false,
    minLength: 1,
    trim: true,
    unique: false,
  },
  bankAccountName: {
    type: String,
    required: false,
    minLength: 1,
    trim: true,
    unique: false,
  },
  bankCity: {
    type: String,
    required: false,
    minLength: 1,
    trim: true,
    unique: false,
  },
  email: {
    type: String,
    required: true,
    minLength: 1,
    trim: true,
    unique: true,
    validate: {
      validator: (value) => {
        return validator.isEmail(value);
      },
      message: '{VALUE} is not an email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  activated: {
    type: Boolean,
    default: false,
    required: true
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

let User = mongoose.model('User', UserSchema);

module.exports = {
  User
};