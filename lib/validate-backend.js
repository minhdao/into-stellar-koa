const { requiredInputs, ValidateRules } = require('./validate-rules.js');

const InputValidator = {
  requiredInputs: requiredInputs,
  validate: async (userInputs) => {
    let results = [{}];
    let validInputs = [{}];
    let invalidInputs = [{}];
    results.push(ValidateRules.emptyInput(userInputs.fam_name));
    results.push(ValidateRules.emptyInput(userInputs.giv_name));
    results.push(ValidateRules.validEmail(userInputs.email));
    results.push(ValidateRules.validPhone(userInputs.phone));
    results.push(ValidateRules.validPasswords(userInputs.password[0], userInputs.password[1]));
    results.forEach((result) => {
      result.isValid ? validInputs.push(result) : invalidInputs.push(result);
    });
    if (invalidInputs.length > 0) {
      throw new Error({});
    }
  }
};

module.exports = {
  InputValidator,
  requiredInputs
};