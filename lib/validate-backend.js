// import variables from validate-rules
const { requiredInputs, ValidateRules } = require('./validate-rules.js');

// variables to store all, valid and invalid results
let results = [];
let validInputs = [];
let invalidInputs = [];

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

    // sort out the results
    results.forEach((result) => {
      result.isValid ? validInputs.push(result) : invalidInputs.push(result);
    });

    // Throw and break if there is any invalid inputs
    if (invalidInputs.length > 0) {
      throw {
        isGood: false,
        message: 'Invalid inputs detected',
        invalidInputs,
        validInputs
      };
    }

    // return back userInputs object if there is no invalid input
    return {
      isGood: true,
      userInputs
    };
  }
};

module.exports = {
  InputValidator,
  requiredInputs
};