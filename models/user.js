const mongoose = require('mongoose');
const { DatabaseError } = require('./../errors/DatabaseError.js');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

// middleware to check(if password modified) and hash password before saving to database
UserSchema.pre('save', function(next) {
  var user = this;
  // only hash password when it's first created or modified
  if (user.isModified('password')) {
    let hashed = bcryptjs.hashSync(user.password, 10);
    user.password = hashed;
    next();
  }
});

// Model method to login user
UserSchema.statics.login = async function(email, password) {
  let User = this;
  // check if email exist
  let user = await User.findOne({ 'email': email });
  if (!user) {
    throw new Error(`cannot find user with email ${email}`);
  }

  // check if password matched
  let correctPassword = bcryptjs.compareSync(password, user.password);
  if (!correctPassword) {
    throw new Error(`wrong password`);
  }

  // return back user if email found and password matched
  return user;
};

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

/**
 * anonymous function - Generate token for specific user
 *
 * @param  {type} type Type of token need to be generated
 * @return {type}      A Promise with the token created
 */
UserSchema.methods.genToken = function(type) {
  var user = this;
  var access = '';
  var raw_sauce = '';
  if (type === 'auth') {
    raw_sauce = process.env.JWT_SECRET_AUTH;
  } else if (type === 'actv') {
    raw_sauce = process.env.JWT_SECRET_ACTV;
  }

  if (type === 'auth') {
    access = 'auth';
  } else if (type === 'actv') {
    access = 'actv';
  }

  var token = jwt.sign({ _id: user._id.toHexString(), access }, raw_sauce).toString();
  user.tokens = user.tokens.concat([{ access, token }]);
  return token;
};

// Model method to find user by Token
UserSchema.statics.findByToken = function(type, token) {
  var User = this;
  var decoded;
  var secret;

  if (type === 'auth') {
    secret = process.env.JWT_SECRET_AUTH;
  } else if (type === 'actv') {
    secret = process.env.JWT_SECRET_ACTV;
  }

  try {
    decoded = jwt.verify(token, secret);
  } catch (e) {
    return Promise.reject(e);
  }

  secret = null;

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': decoded.access
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

UserSchema.methods.getToken = function(type) {
  let user = this;
  return new Promise((res, rej) => {
    user.tokens.forEach((token) => {
      if (token.access === type) {
        res(token.token);
      }
    });
    rej('cannot get token');
  });
};

let User = mongoose.model('User', UserSchema);

module.exports = {
  User
};