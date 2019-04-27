'use strict';

const TEST = require('../models/test2');

/*
 * 오류 예외처리 시 반복해서 try catch문을 사용하게 되면 코드가 길어짐.
 * 따라서 미들웨어를 사용 ('../middlewares/koa)
 * 오류처리를 미들웨어로 보냄
 */
// const getTest = async (ctx) => {
//     let test;
//     try {
//         test = await TEST.getTest();
//     } catch (err) {
//         console.log(err);
//         return ctx.send(422); // error code
//     }
//     console.log('con');
//     return ctx.send(200, test);
// };

const getTest = async (ctx) => {
    const test = await TEST.getTest();
    return ctx.send(200, test);
};

module.exports.getTest = getTest;
