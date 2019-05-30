'use strict';

const USER = require('../models/user');

const getUserInfo = async (ctx) => {
    const userId = ctx.request.body.userId;
    const userInfo = await USER.getUserInfo(userId);

    return ctx.send(200, {
        userInfo,
    });
};

// 작성한 글 리스트
const writedList = async (ctx) => {
    const userId = ctx.request.body.userId;
    const writedList = await USER.writedList(userId);
    return ctx.send(200, {
        writedList,
    });
};

// 좋아요 누른 글 리스트
const likeList = async (ctx) => {
    const userId = ctx.request.body.userId;
    const likeList = await USER.likeList(userId);
    return ctx.send(200, {
        likeList,
    });
};

module.exports.getUserInfo = getUserInfo;
module.exports.writedList = writedList;
module.exports.likeList = likeList;
