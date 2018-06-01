class DatabaseError extends Error {
  constructor(message, error) {
    super(message);
    this._error = validInputs;
  }
  get error() {
    return this._error;
  }
}

module.exports = {
  DatabaseError
};