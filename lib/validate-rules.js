/**
 * [requiredInputs inputs required to create an user account]
 * @type {Array}
 */
const inputs = ['fam_name', 'mid_name', 'giv_name', 'phone', 'email', 'password', 'socialIdNum', 'bankName', 'bankAccountNum', 'bankAccountName', 'bankCity'];

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
   * [createValidationResult create ValidationResult instance]
   * @param  {Boolean} isValid [true if the result is valid, false otherwise]
   * @param  {[string]}  message [validation message]
   * @param  {[string]}  color   [validation color]
   * @return {[ValidationResult]}          [ValidationResult instance]
   */
  createValidationResult: function(isValid, message, color) {
    return new ValidationResult(isvalid, message, color);
  },

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
  validEmail: function(email) {
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!this.emptyInput(email).isValid) {
      return new ValidationResult(false, 'Such empty :(', 'red');
    }
    if (!regex.test(email)) {
      return new ValidationResult(false, 'Such invalid :(', 'red');
    }
    return new ValidationResult(true, 'Looks good :)', 'green');
  },


  /**
   * [validPhone check if phone passes regex defined]
   * @param  {[string]} phone [string of numbers]
   * @return {[type]}       [description]
   */
  validPhone: function(phone) {
    let regex = /[0-9]+/;
    if (!this.emptyInput(phone).isValid) {
      return new ValidationResult(false, 'Such empty :(', 'red');
    }
    if (!regex.test(phone)) {
      return new ValidationResult(false, 'Such invalid :(', 'red');
    }
    return new ValidationResult(true, 'Looks good :)', 'green');
  },

  /**
   * [validSocialNumber logics to validate social number]
   * @param  {[type]} socialNumber [description]
   * @return {[type]}              [description]
   */
  validSocialNumber: function(socialNumber) {
    let regex = /[0-9]+/;
    if (!regex.test(socialNumber)) {
      return new ValidationResult(false, 'Invalid social number', 'red');
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
  inputs,
  ValidateRules
};