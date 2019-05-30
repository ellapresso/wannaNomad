'use strict';

const POST = require('../models/post');
const HASH = require('../models/hash');

// 글 목록
const getPost = async (ctx) => {
    const userId = ctx.request.body.userId;
    const page = ctx.request.body.page;
    const word = ctx.request.body.search;
    const post = await POST.getPost(userId, page, word);
    const totalPost = await POST.getTotal(word);
    return ctx.send(200, {
        post,
        totalPost,
    });
};

// 글 쓰기
const setPost = async (ctx) => {
    const req = ctx.request.body;
    const postContents = [req.title, req.contents, req.writer, req.wrDate];

    const hash = req.hash;
    const write = await POST.setPost(postContents);
    const hashes = await HASH.setHash(write.insertId, hash);
    /* TODO..
     * hash등록 에러시, post는 등록이 되는 상태.
     * 그 경우 error는 보내지고 있음.
     * try catch 로 잡아주기.
     * */
    return ctx.send(200, {
        write,
        hashes,
    });
};

// 글 수정
const updatePost = async (ctx) => {
    const req = ctx.request.body;
    const postContents = [req.title, req.contents, req.writer, req.upDate, req.pno];
    // const delInfo = [req.upDate, req.pno, req.delHash];
    const write = await POST.updatePost(postContents);
    const addHash = await HASH.setHash(req.pno, req.addHash);
    const delHash = await HASH.deleteHash(req.upDate, req.pno, req.delHash);
    return ctx.send(200, {
        write,
        delHash,
        addHash,
    });
};

// 글 삭제
const delPost = async (ctx) => {
    const req = ctx.request.body;
    const pno = req.pno;
    const id = req.writer;
    const upDate = req.upDate;
    const delInfo = [upDate, pno, id];
    const delPost = await POST.deletePost(delInfo);
    const delHash = await POST.deleteHash(upDate, pno);
    return ctx.send(200, {
        delPost,
        delHash,
    });
};

// 글 상세
const getContents = async (ctx) => {
    const req = ctx.request.body;
    const pno = req.pno;
    const id = req.userId;
    const info = [pno, id];
    const getContent = await POST.getContents(info);
    return ctx.send(200, {
        getContent: getContent[0],
    });
};

module.exports.getPost = getPost;
module.exports.setPost = setPost;
module.exports.updatePost = updatePost;
module.exports.delPost = delPost;
module.exports.getContents = getContents;
