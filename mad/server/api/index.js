'use strict';

const Router = require('koa-router');

const testCtrl = require('./controllers/test2');
const postCtrl = require('./controllers/post');
const hashCtrl = require('./controllers/hash');
const loginCtrl = require('./controllers/login');

const POST = '/api/post';
const HASH = '/api/hash';
// const LIST = '/api/list';

module.exports = (app) => {
    const router = new Router();

    app.use(router.routes());
    app.use(router.allowedMethods());

    router.get(`/api/test2`, testCtrl.getTest);
    router.post(`${POST}`, postCtrl.setPost);
    router.post(`${POST}/edit`, postCtrl.updatePost);
    router.post(`${POST}/del`, postCtrl.delPost);
    router.get(`${POST}/list`, postCtrl.getPost);

    router.post(`${HASH}`, hashCtrl.setHash);
    router.post(`${HASH}/del`, hashCtrl.delHash);

    router.post(`/kakaologin`, loginCtrl.kakaoLogin);

    // TODO
    // router.post(`${LIST}/like`, hashCtrl.likeList);
};
