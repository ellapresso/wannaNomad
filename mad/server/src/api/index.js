'use strict';

const Router = require('koa-router');

const testCtrl = require('./controllers/test');

const TEST = '/api/test';

module.exports = app => {
	const router = new Router();

	app.use(router.routes());
	app.use(router.allowedMethods());

	router.get(`${TEST}`, testCtrl.getTest); // 사용자 정보 조회
};
