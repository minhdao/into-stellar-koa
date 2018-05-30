const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let dbConnect = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
};

dbConnect().then(() => {}).catch((error) => {
  console.log('Db connection FAILED ...');
  console.log(error);
});

module.exports = {
  mongoose
};