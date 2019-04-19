'use strict';

const POST = require('../models/post');

// 해시태그 등록
const setHash = async (ctx) => {
    const req = ctx.request.body;
    const pno = req.pno;
    const hash = req.hash;
    const hashes = await POST.setHash(pno, hash);
    return ctx.send(200, { hashes });
};

module.exports.setHash = setHash;
