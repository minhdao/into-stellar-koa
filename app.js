/**
 * App home
 */

// Load config
require('./config/config.js');

const render = require('./lib/render.js');
const {mongoose} = require('./db/mongoose.js');
const {User} = require('./models/user.js');
const {ObjectID} = require('mongodb');
const _ = require('lodash');
const bodyParser = require('koa-bodyparser');
const Koa = require('koa');
const convert = require('koa-convert');
const KoaRouter = require('koa-router');
const serve = require('koa-static');

let app = new Koa();
let route = new KoaRouter();

app.use(render);

app.context.printName = (name) => {
    console.log(name);
};

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
app.use(appLogger);
app.use(bodyParser());
// everything in /public will be server as static files
app.use(serve(__dirname + '/public'));

route.get('/register', async function (ctx) {
    console.log('GET /register');
    ctx.response.status = 200;
    await ctx.render('register.html', {content: 'hello'});
});

route.post('/register', async function (ctx) {
    console.log('POST /register');
    console.log('request body ', ctx.request.body);
    ctx.response.body = ctx.request.body;
});

route.post('/activate/:token', async function (ctx) {
    console.log('POST /register');
});

app.use(route.routes());

app.listen(3000);
