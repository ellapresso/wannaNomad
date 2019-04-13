const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const helmet = require('koa-helmet');

// Koa 미들웨어 설정
module.exports = (app) => {
    app.use(helmet());

    /**
     * 오류 케이스 처리
     */
    app.use(async (ctx, next) => {
        try {
            await next();
        } catch (err) {
            ctx.type = 'json';
            ctx.status = err.status || 500;
            ctx.body = {
                code: err.status || 500,
                result: 'FAILURE',
                error: {
                    message: err.message,
                },
            };
            ctx.app.emit('error', err, ctx);
        }
    });

    app.use(
        bodyParser({
            enableTypes: ['json', 'form'],
            jsonLimit: '50mb',
            strict: true,
            onerror: (err, ctx) => {
                ctx.throw('body parse error', 422);
            },
        })
    );
    // TODO
    // app.use(
    //     cors({
    //         origin: 'https://mad-blog.now.sh/',
    //     })
    // );
};
