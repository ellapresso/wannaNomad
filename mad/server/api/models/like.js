'use strict';

const DB = require('../../config/database');

const madDatabase = DB.madDb;
const Like = {
    setLike: (pno, id) => {
        let sql = 'INSERT INTO `likes`(`pno`,`luser`) SELECT ?, ? FROM DUAL ';
        sql += 'WHERE NOT EXISTS (SELECT `pno`, `luser` FROM `likes` WHERE `pno` = ? AND `luser` = ?)';
        return madDatabase
            .promise()
            .query(sql, [pno, id, pno, id])
            .then(([rows]) => {
                return rows;
            });
    },
    delLike: (pno, id) => {
        const sql = 'DELETE FROM `likes` WHERE `pno` = ? AND `luser` = ?';
        return madDatabase
            .promise()
            .query(sql, [pno, id])
            .then(([rows]) => {
                return rows;
            });
    },
    rankLike: () => {
        const sql = 'SELECT `pno`,count(`luser`) AS `like` FROM `likes` GROUP BY `pno` ORDER BY `like` DESC';
        return madDatabase
            .promise()
            .query(sql)
            .then(([rows]) => {
                return rows;
            });
    },
    chartLike: () => {
        let sql = 'select b.`pno`,`title`,`nickname`,b.`writer` as `userId`,`thumbnail_image` as `thumbnail`, `wrDate`, if(`likeCnt` is null, 0 ,`likeCnt`) `likeCnt` from ';
        sql += '(select p.`pno`, p.`title`,p.`writer`, u.`nickname`, u.`thumbnail_image`, p.`wrDate` ';
        sql += 'from `posts` p left join `users` u on p.`writer` = u.`id` where p.`isDel`=0) b ';
        sql += 'left join ';
        sql += '(SELECT `pno`,count(`luser`) `likeCnt` FROM `likes` GROUP BY `pno`) a on a.`pno` = b.`pno` ORDER BY `likeCnt` DESC LIMIT 10 ';
        return madDatabase
            .promise()
            .query(sql)
            .then(([rows]) => {
                return rows;
            });
    },
};

module.exports = Like;
