'use strict';

const DB = require('../../config/database');

const madDatabase = DB.madDb;
const Like = {
    setLike: (pno, id) => {
        return madDatabase
            .promise()
            // eslint-disable-next-line max-len
            .query('INSERT INTO `likes`(`pno`,`luser`) SELECT ?, ? FROM DUAL WHERE NOT EXISTS (SELECT `pno`, `luser` FROM `likes` WHERE `pno` = ? and `luser` = ?)', [pno, id, pno, id])
            .then(([rows]) => {
                return rows;
            });
    },
    delLike: (pno, id) => {
        return madDatabase
            .promise()
            .query('DELETE FROM `likes` WHERE `pno` = ? and `luser` = ?', [pno, id])
            .then(([rows]) => {
                return rows;
            });
    },
    chartLike: () => {
        return madDatabase
            .promise()
            .query('select `pno`,count(`luser`) `likeCnt` from `likes` group by `pno` order by count(`luser`) desc;')
            .then(([rows]) => {
                return rows;
            });
    },
};

module.exports = Like;
