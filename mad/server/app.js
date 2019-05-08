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
 * 서버 구동
 */
// const serverStart = () => {
//     server.listen(process.env.PORT || 4000, async () => {
//         console.log('서버 시작');
//     });
// };

/**
 * 서버 종료시 후처리
 * - 데이터베이스 커넥션 종료
 */
// process.on('SIGINT', () => {
//     console.log('서버 종료');
//     server.close(() => {
//         database.mystockDb.close();
//         database.tudalwebDb.close();
//         database.redisDb.disconnect();
//         console.log('디비 종료');
//         process.exit(0);
//     });
// });

/**
 * 처리하지 못한 예외조항 로그기록
 */
process.on('uncaughtException', (err) => {
    console.log(err);
});

// setImmediate(serverStart);

module.exports = app;
