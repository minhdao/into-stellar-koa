class ValidationError extends Error {
  constructor(message, validInputs, inValidInputs) {
    super(message);
    this._validInputs = validInputs;
    this._inValidInputs = inValidInputs;
  }
  get validInputs() {
    return this._validInputs;
  }
  get inValidInputs() {
    return this._inValidInputs;
  }
}

module.exports = {
  ValidationError
};