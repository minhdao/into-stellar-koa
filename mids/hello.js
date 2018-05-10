let hello = async (ctx, next) => {
    ctx.hello = 'hello from the middleware';
    await next();
};

module.exports = hello;
