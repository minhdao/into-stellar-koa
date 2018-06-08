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

route.get('/', async function(ctx) {
  console.log('GET /');
  ctx.response.status = 200;
  await ctx.render('index.html', { content: 'clover trade', title: 'Clover Trade' });
});

route.get('/login', async function(ctx) {
  console.log('GET /login');
  ctx.response.status = 200;
  await ctx.render('login.html', { content: '' });
});

route.post('/login', async function(ctx) {
  console.log('POST /login');
  let user = _.pick(ctx.request.body, ['email', 'password']);
  try {
    let result = await User.login(user.email, user.password);
    ctx.response.status = 200;
    let token = result.getToken('auth');
    ctx.set('x-auth', token);
    // await ctx.render('home.html', { user: 'Minh' });
  } catch (e) {
    ctx.response.status = 400;
    ctx.response.body = e.message;
  }
});

route.get('/register', async function(ctx) {
  console.log('GET /register');
  ctx.response.status = 200;
  await ctx.render('register.html', { content: '' });
});

route.post('/register', async function(ctx) {
  console.log('POST /register');
  let userInputs = _.pick(ctx.request.body, requiredInputs);
  try {
    await InputValidator.validate(userInputs);
    let user = new User(userInputs);
    let authToken = user.genToken('auth');
    let saveResult = await user.saveUser();
    ctx.set('x-auth', authToken);
    ctx.response.status = 200;
    ctx.response.body = saveResult;
  } catch (error) {
    ctx.response.status = 400;
    ctx.response.body = error;
  }
});

route.post('/activate/:token', async function(ctx) {
  console.log('POST /register');
});

app.use(route.routes());

module.exports.app = app.listen(3000);