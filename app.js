/**
 * App home
 */

// Load config
require('./config/config.js');

const render = require('./lib/render.js');
const { requiredInputs, InputValidator } = require('./lib/validate-backend.js');
const { mongoose } = require('./db/mongoose.js');
const { User } = require('./models/user.js');
const { ObjectID } = require('mongodb');
const _ = require('lodash');
const bodyParser = require('koa-bodyparser');
const Koa = require('koa');
const convert = require('koa-convert');
const KoaRouter = require('koa-router');
const serve = require('koa-static');

let app = new Koa();
let route = new KoaRouter();

app.use(render);

let appLogger = async (ctx, next) => {
  console.log('Log');
  console.log(ctx.header);
  await next();
};

let requestTime = async (ctx, next) => {
  ctx.requestTime = new Date();
  await next();
  console.log(`Request took: ${new Date() - ctx.requestTime} ms.`);
};

app.use(requestTime);
// app.use(appLogger);
app.use(bodyParser());
// everything in /public will be server as static files
app.use(serve(__dirname + '/public'));

route.get('/register', async function(ctx) {
  console.log('GET /register');
  ctx.response.status = 200;
  await ctx.render('register.html', { content: '' });
});

route.post('/register', async function(ctx) {
  console.log('POST /register');
  let status = 400;
  let result = {};
  let userInputs = _.pick(ctx.request.body, requiredInputs);

  // this code has bug
  // status is always 400 and body is always {}
  // fix this!

  InputValidator.validate(userInputs).then((validInputs) => {
    // Save user into DB
    let user = new User(validInputs);
    console.log('should run first');
    user.save().then((user) => {
      status = 200;
      result = user;
    }).catch((error) => {
      status = 400;
      result = error;
    });
  }).catch((error) => {
    // Return failed results back to render the view
    status = 400;
    result = error;
  });
  ctx.response.status = status;
  ctx.response.body = result;
  console.log('should run after');
});

route.post('/activate/:token', async function(ctx) {
  console.log('POST /register');
});

app.use(route.routes());

module.exports.app = app.listen(3000);