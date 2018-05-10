const views = require('koa-views');
const path = require('path');

console.log('views path: ', path.join(__dirname + './../views'));
module.exports = views(path.join(__dirname, './../views'), {
    map: {html: 'handlebars'}
});
