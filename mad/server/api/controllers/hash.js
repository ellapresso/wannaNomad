'use strict';

const HASH = require('../models/hash');

// 해시태그 등록
const setHash = async (ctx) => {
    const req = ctx.request.body;
    const pno = req.pno;
    const hash = req.hash;
    const hashes = await HASH.setHash(pno, hash);
    return ctx.send(200, {
        hashes,
    });
};

const delHash = async (ctx) => {
    const req = ctx.request.body;
    const pno = req.pno;
    const contents = req.hContent;
    const upDate = req.upDate;
    const delInfo = [upDate, pno, contents];
    const delHash = await HASH.deleteHash(delInfo);
    return ctx.send(200, {
        delHash,
    });
};

const rankHash = async (ctx) => {
    const rankHash = await HASH.rankHash();
    return ctx.send(200, {
        rankHash: rankHash[0],
    });
};

const chartHash = async (ctx) => {
    const chartHash = await HASH.chartHash();
    return ctx.send(200, {
        chartHash,
    });
};

module.exports.setHash = setHash;
module.exports.delHash = delHash;
module.exports.rankHash = rankHash;
module.exports.chartHash = chartHash;
