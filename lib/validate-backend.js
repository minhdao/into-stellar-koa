const { requiredInputs, ValidateRules } = require('./validate-rules.js');

const InputValidator = {
  requiredInputs: requiredInputs,
  validate: async (userInputs) => {
    let results = [{}];
    results.push(ValidateRules.emptyInput(userInputs.fam_name));
    results.push(ValidateRules.emptyInput(userInputs.giv_name));
    results.push(ValidateRules.validEmail(userInputs.email));
    results.push(ValidateRules.validPhone(userInputs.phone));
    results.push(ValidateRules.validPasswords(userInputs.password[0], userInputs.password[1]));
    results.forEach((result) => {
      if (result.isValid === false) {
        throw new Error('something went wrong');
      }
    });
    return userInputs;
  }
};

module.exports = {
  InputValidator,
  requiredInputs
};