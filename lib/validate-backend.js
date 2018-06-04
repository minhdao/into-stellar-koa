// import variables from validate-rules
const { requiredInputs, ValidateRules } = require('./validate-rules.js');
const { ValidationError } = require('./../errors/ValidationError.js');

/**
 * [InputValidator Object to encapsulate server side validation logics]
 * @type {Object}
 */
const InputValidator = {
  /**
   * [method to define server validation logics]
   * @param  {[Object]} userInputs [user input objects]
   * @return {[type]}              [no return]
   */
  validate: async function(userInputs) {
    // variables to store all, valid and invalid results
    let results = [];
    let validInputs = [];
    let invalidInputs = [];

    // check family name
    let famNameResult = ValidateRules.emptyInput(userInputs.fam_name);
    famNameResult.inputID = 'fam_name';
    famNameResult.inputValue = userInputs.fam_name;
    results.push(famNameResult);

    // check given name
    let givNameResult = ValidateRules.emptyInput(userInputs.giv_name);
    givNameResult.inputID = 'giv_name';
    givNameResult.inputValue = userInputs.giv_name;
    results.push(givNameResult);

    // check email - must wait for this to get done before doing the next thing
    let emailResult = await ValidateRules.validEmail(userInputs.email);
    emailResult.inputID = 'email';
    emailResult.inputValue = userInputs.email;
    results.push(emailResult);

    // check phone number
    let phoneResult = ValidateRules.validPhone(userInputs.phone);
    phoneResult.inputID = 'phone';
    phoneResult.inputValue = userInputs.phone;
    results.push(phoneResult);

    // check passwords
    let passwordsResult = ValidateRules.validPasswords(userInputs.password[0], userInputs.password[1]);
    passwordsResult.inputID = 'password';
    passwordsResult.inputValue = '';
    results.push(passwordsResult);

    // sort out the results
    results.forEach((result) => {
      result.isValid ? validInputs.push(result) : invalidInputs.push(result);
    });

    // Throw and break if there is any invalid inputs
    if (invalidInputs.length > 0) {
      throw new ValidationError('Invalid inputs', validInputs, invalidInputs);
    }

    // return back userInputs object if there is no invalid input
    let user = {
      'fame_name': userInputs.fam_name,
      'giv_name': userInputs.giv_name,
      'email': userInputs.email,
      'phone': userInputs.phone,
      'password': userInputs.password[0]
    };
    return user;
  }
};

module.exports = {
  InputValidator,
  requiredInputs
};