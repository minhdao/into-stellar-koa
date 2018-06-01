const mongoose = require('mongoose');
const { DatabaseError } = require('./../errors/DatabaseError.js');

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
    sparse: true
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

// Model method to find user by email
UserSchema.statics.findByEmail = function(email) {
  let User = this;
  return User.findOne({
    'email': email,
  });
};

// Model method to find user by socialId
UserSchema.statics.findBySocialId = function(socialId) {
  let User = this;
  return User.findOne({
    'socialIdNum': socialId,
  });
};

// Intance method to save user
UserSchema.methods.saveUser = async function() {
  let user = this;
  try {
    return await user.save();
  } catch (error) {
    throw new DatabaseError('Cannot save user into db', error);
  }
};

let User = mongoose.model('User', UserSchema);

module.exports = {
  User
};