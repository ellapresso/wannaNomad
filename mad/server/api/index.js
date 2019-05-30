'use strict';

const Router = require('koa-router');

const postCtrl = require('./controllers/post');
const hashCtrl = require('./controllers/hash');
const likeCtrl = require('./controllers/like');
const loginCtrl = require('./controllers/login');
const userCtrl = require('./controllers/user');

const POST = '/api/post';
const HASH = '/api/hash';
const USER = '/api/user';

module.exports = (app) => {
    const router = new Router();

    app.use(router.routes());
    app.use(router.allowedMethods());

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
    router.get(`/api/like/rank`, likeCtrl.rankLike);

    router.get(`/api/chart-hash`, hashCtrl.chartHash);
    router.get(`/api/chart-like`, likeCtrl.chartLike);

    // 마이페이지
    router.post(`${USER}`, userCtrl.getUserInfo);
    router.post(`${USER}-writed`, userCtrl.writedList);
    router.post(`${USER}-like`, userCtrl.likeList);
};
