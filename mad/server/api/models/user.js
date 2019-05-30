'use strict';

const DB = require('../../config/database');

const madDatabase = DB.madDb;

const User = {
    // 신규 회원
    saveUser: (userinfo, id) => {
        let sql = 'INSERT INTO users ( `id` , `nickname` , `profile_image` , `thumbnail_image` , `reg_date` ) ';
        sql += 'values(?, ?, ?, ?, CURRENT_TIMESTAMP ) ';
        sql += 'ON DUPLICATE KEY UPDATE `nickname` = ?, `profile_image` = ?, `thumbnail_image` = ?, `update_day` = CURRENT_TIMESTAMP';
        return madDatabase
            .promise()
            .query(sql, userinfo)
            .then(([rows]) => {
                return rows;
            });
    },
    // 기존 사용자 업데이트
    ourMember: (id) => {
        const sql = 'UPDATE `users` SET `update_day`= CURRENT_TIMESTAMP where `id`=?';
        return madDatabase
            .promise()
            .query(sql, id)
            .then((rows) => {
                return rows;
            });
    },
    getUserInfo: (id) => {
        const sql = 'select * from `users` where `id`=?';
        return madDatabase
            .promise()
            .query(sql, id)
            .then(([rows]) => {
                return rows;
            });
    },
    writedList: (id) => {
        const sql = 'select * from `posts` where `writer` = ? and `isDel` = 0';
        return madDatabase
            .promise()
            .query(sql, id)
            .then(([rows]) => {
                return rows;
            });
    },
    likeList: (id) => {
        const sql = 'select * from `posts` p inner join `likes` l on p.`pno` = l.`pno` where `luser` = ? and `isDel` = 0';
        return madDatabase
            .promise()
            .query(sql, id)
            .then(([rows]) => {
                return rows;
            });
    },
};

module.exports = User;
