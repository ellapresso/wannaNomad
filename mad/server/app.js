'use strict';

const Koa = require('koa');
const respond = require('koa-respond');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();

require('dotenv').config();

const db = require('./config/database');
require('./api/middlewares/koa')(app);

app.use(respond());
require('./routes')(app);

app.listen(process.env.PORT);
app.use(router.routes()).use(router.allowedMethods());

router.get('/health', (ctx) => {
    ctx.ok();
});

router.get('/test', (ctx) => {
    const testSql = 'select * from test where test_no=2';
    return db.madDb
        .promise()
        .query(testSql)
        .then(([rows, fields]) => {
            return ctx.send(200, {
                test: rows,
            });
        });
});

/**
 * 처리하지 못한 예외조항 로그기록
 */
process.on('uncaughtException', (err) => {
    console.log(err);
});

module.exports = app;
