'use strict';
const axios = require('axios');
const USER = require('../models/user');
// 글 목록
const kakaoLogin = async (ctx) => {
    const token = ctx.request.body;
    return axios({
        method: 'post',
        url: 'https://kapi.kakao.com/v2/user/me',
        headers: token,
        responseType: 'json',
    }).then(function (response) {
        const id = response.data.id;
        const nickname = response.data.properties.nickname;
        const profile_image = response.data.properties.profile_image;
        const thumbnail_image = response.data.properties.thumbnail_image;

        const userinfo = [id, nickname, profile_image, thumbnail_image, nickname, profile_image, thumbnail_image];
        const userJoin = USER.saveUser(userinfo);
        ctx.send(200, {
            userJoin,
            status: 'ok',
        });
    });
};

module.exports.kakaoLogin = kakaoLogin;
