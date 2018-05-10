const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let dbConnect = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
};

dbConnect().then(() => {
    console.log('Db Connection successful ... ');
}).catch((error) => {
    console.log('Db connection FAILED ...');
    console.log(error);
});

module.exports = {
    mongoose
};
