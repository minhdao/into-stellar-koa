console.log('validate-functions.js loaded ...');

/**
 * [ValidationResult object constructor]
 * @param  {Boolean}   isValid [true if input is valid, false other wise]
 * @param  {[string]}  text    [text to be display]
 * @param  {[string]}  color   [border color of the input]
 * @return {[Object]}          [ValidationResult]
 */
let ValidationResult = function(isValid, text, color) {
    this.isValid = isValid;
    this.text = text;
    this.color = color;
};

/**
 * [prepareInput remove extra spaces for each input]
 * @param  {[string]} input [input from user]
 * @return {[type]}         [no return]
 */
let prepareInput = (input) => {
    return input.trim();
};

/**
 * [emptyInput check if an input is '' value]
 * @param  {[string]}  input [HTML input element]
 * @return {Promise}       [true if '' value, false otherwise]
 */
let emptyInput = (input) => {
    if (input === '') {
        return new ValidationResult(false, 'Such empty :(', 'red');
    } else {
        return new ValidationResult(true, 'Looks good :)', 'green');
    }
};

/**
 * [validEmail check if email passes regex defined]
 * @param  {[string]} email [email provided]
 * @return {[boolean]}       [true if passes regex, false otherwise]
 */
let validEmail = (email) => {
    console.log('valid email called ... ');
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emptyInput(email).isValid) {
        return new ValidationResult(false, 'Such empty :(', 'red');
    }
    if (!regex.test(email)) {
        return new ValidationResult(false, 'Such invalid :(', 'red');
    }
    return new ValidationResult(true, 'Looks good :)', 'green');
};

/**
 * [validPhone check if phone passes regex defined]
 * @param  {[string]} phone [string of numbers]
 * @return {[type]}       [description]
 */
let validPhone = (phone) => {
    let regex = /[0-9]/;
    if (!emptyInput(phone).isValid) {
        return new ValidationResult(false, 'Such empty :(', 'red');
    }
    if (!regex.test(phone)) {
        return new ValidationResult(false, 'Such invalid :(', 'red');
    }
    return new ValidationResult(true, 'Looks good :)', 'green');
};

/**
 * [matchedPasswords check if passwords are valid and match each other]
 * @param  {[string]} password1 [first password]
 * @param  {[string]} password2 [second password]
 * @return {[boolean]}          [return true if valid, false otherwise]
 */
let validPasswords = (password1, password2) => {
    let regex = /^[a-zA-Z0-9!@#$%^&*]{6,}/;
    if (!emptyInput(password1).isValid || !emptyInput(password2).isValid) {
        return new ValidationResult(false, 'Such empty :(', 'red');
    }
    if (!regex.test(password1) || !regex.test(password2)) {
        return new ValidationResult(false, 'Such invalid :(', 'red');
    }
    if (!(password1 === password2)) {
        return new ValidationResult(false, 'Passwords such not alike :(', 'red');
    }
    return new ValidationResult(true, 'Looks good :)', 'green');
};