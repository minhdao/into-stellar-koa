const { requiredInputs, ValidateRules } = require('./validate-rules.js');

const InputValidator = {
  validate: async (userInputs) => {
    let results = [{}];
    let validInputs = [{}];
    let invalidInputs = [{}];
    let fam_name = ValidateRules.emptyInput(userInputs.fam_name);
    fam_name.inputID = 'fam_name';
    results.push(fam_name);
    results.push(ValidateRules.emptyInput(userInputs.giv_name));
    results.push(ValidateRules.validEmail(userInputs.email));
    results.push(ValidateRules.validPhone(userInputs.phone));
    results.push(ValidateRules.validPasswords(userInputs.password[0], userInputs.password[1]));
    results.forEach((result) => {
      result.isValid ? validInputs.push(result) : invalidInputs.push(result);
    });
    if (invalidInputs.length > 0) {
      throw {
        message: 'Invalid inputs detected',
        invalidInputs,
        validInputs
      };
    }
    return userInputs;
  }
};

module.exports = {
  InputValidator,
  requiredInputs
};