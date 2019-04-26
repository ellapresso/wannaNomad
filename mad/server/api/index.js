'use strict';

const Router = require('koa-router');

const testCtrl = require('./controllers/test2');
const postCtrl = require('./controllers/post');
const hashCtrl = require('./controllers/hash');
const likeCtrl = require('./controllers/like');
const loginCtrl = require('./controllers/login');

const POST = '/api/post';
const HASH = '/api/hash';

module.exports = (app) => {
    const router = new Router();

    app.use(router.routes());
    app.use(router.allowedMethods());

    router.get(`/api/test2`, testCtrl.getTest);

    router.post(`/kakaologin`, loginCtrl.kakaoLogin);

    router.post(`${POST}`, postCtrl.setPost);
    router.post(`${POST}/edit`, postCtrl.updatePost);
    router.post(`${POST}/del`, postCtrl.delPost);
    router.post(`${POST}/list`, postCtrl.getPost);
    router.post(`${POST}/contents`, postCtrl.getContents);

    router.post(`${HASH}`, hashCtrl.setHash);
    router.post(`${HASH}/del`, hashCtrl.delHash);
    router.get(`${HASH}/rank`, hashCtrl.rankHash);

    router.post(`/api/like`, likeCtrl.setLike);
    router.post(`/api/unlike`, likeCtrl.delLike);
};
