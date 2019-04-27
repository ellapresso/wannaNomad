'use strict';

const LIKE = require('../models/like');

// 좋아요
const setLike = async (ctx) => {
    const req = ctx.request.body;
    const pno = req.pno;
    const userId = req.userId;
    const setLike = await LIKE.setLike(pno, userId);
    return ctx.send(200, {
        pno,
        userId,
    });
};

// 좋아요 해제
const delLike = async (ctx) => {
    const req = ctx.request.body;
    const pno = req.pno;
    const userId = req.userId;
    const delLike = await LIKE.delLike(pno, userId);
    return ctx.send(200, {
        pno,
        userId,
    });
};

module.exports.setLike = setLike;
module.exports.delLike = delLike;
