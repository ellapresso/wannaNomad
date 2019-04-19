'use strict';

const Router = require('koa-router');

module.exports = (app) => {
    const router = new Router();

    app.use(router.routes());
    app.use(router.allowedMethods());

    router.get('/health', (ctx) => {
        ctx.ok();
    });
};
