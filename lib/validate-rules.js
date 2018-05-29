const { User } = require('./../models/user.js');
/**
 * [requiredInputs inputs required to create an user account]
 * @type {Array}
 */
const requiredInputs = ['fam_name', 'giv_name', 'phone', 'email', 'password'];

/**
 * [ValidationResult object constructor]
 * @param  {Boolean}   isValid [true if input is valid, false other wise]
 * @param  {[string]}  message    [message to be display]
 * @param  {[string]}  color   [border color of the input]
 * @return {[Object]}          [ValidationResult]
 */
class ValidationResult {
  constructor(isValid, message, color) {
    this.isValid = isValid;
    this.message = message;
    this.color = color;
  }
  set inputID(id) {
    this._inputID = id;
  }
  get inputID() {
    return this._inputID;
  }
  set inputValue(value) {
    this._inputValue = value;
  }
  get inputValue() {
    return this._inputValue;
  }
};

const ValidateRules = {
  /**
   * [prepareInput remove extra spaces for each input]
   * @param  {[string]} input [input from user]
   * @return {[type]}         [no return]
   */
  prepareInput: function(input) {
    return input.trim();
  },

  /**
   * [emptyInput check if an input is '' value]
   * @param  {[string]}  input [HTML input element]
   * @return {Promise}       [true if '' value, false otherwise]
   */
  emptyInput: function(input) {
    if (input === '') {
      return new ValidationResult(false, 'Such empty :(', 'red');
    } else {
      return new ValidationResult(true, 'Looks good :)', 'green');
    }
  },

  /**
   * [validEmail check if email passes regex defined]
   * @param  {[string]} email [email provided]
   * @return {[boolean]}       [true if passes regex, false otherwise]
   */
  validEmail: async function(email) {
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!this.emptyInput(email).isValid) {
      return new ValidationResult(false, 'Such empty :(', 'red');
    }
    if (!regex.test(email)) {
      return new ValidationResult(false, 'Such invalid :(', 'red');
    }
    // async call to check on db - await to make sure this is done before doing anything else
    let emailExisted = await User.findByEmail(email).then((result) => {
      if (result) {
        return true;
      }
    });
    // return a false validation if email already existed in db
    if (emailExisted) {
      return new ValidationResult(false, 'Duplicate email :(', 'red');
    }
    return new ValidationResult(true, 'Looks good :)', 'green');
  },

  /**
   * [validSocialId logics to validate a given social number]
   * @param  {[number]} socialId [social id input from user]
   * @return {[ValidataionResult]}          [Validataion result]
   */
  validSocialId: async function(socialId) {
    let regex = /^[0-9]+$/;
    if (!regex.test(socialId)) {
      return new ValidationResult(false, 'Invalid social id :(', 'red');
    }
    let existed = await User.findBySocialId(socialId).then((result) => {
      if (result) {
        return true;
      }
    });
    if (existed) {
      return new ValidationResult(false, 'Social ID already existed', 'red');
    }
    return new ValidationResult(true, 'Looks good :)', 'green');
  },


  /**
   * [validPhone check if phone passes regex defined]
   * @param  {[string]} phone [string of numbers]
   * @return {[type]}       [description]
   */
  validPhone: function(phone) {
    let regex = /[0-9]/;
    if (!this.emptyInput(phone).isValid) {
      return new ValidationResult(false, 'Such empty :(', 'red');
    }
    if (!regex.test(phone)) {
      return new ValidationResult(false, 'Such invalid :(', 'red');
    }
    return new ValidationResult(true, 'Looks good :)', 'green');
  },

  /**
   * [matchedPasswords check if passwords are valid and match each other]
   * @param  {[string]} password1 [first password]
   * @param  {[string]} password2 [second password]
   * @return {[boolean]}          [return true if valid, false otherwise]
   */
  validPasswords: function(password1, password2) {
    let regex = /^[a-zA-Z0-9!@#$%^&*]{6,}/;
    if (!this.emptyInput(password1).isValid || !this.emptyInput(password2).isValid) {
      return new ValidationResult(false, 'Such empty :(', 'red');
    }
    if (!regex.test(password1) || !regex.test(password2)) {
      return new ValidationResult(false, 'Such invalid :(', 'red');
    }
    if (!(password1 === password2)) {
      return new ValidationResult(false, 'Passwords such not alike :(', 'red');
    }
    return new ValidationResult(true, 'Looks good :)', 'green');
  }
};

module.exports = {
  requiredInputs,
  ValidateRules
};