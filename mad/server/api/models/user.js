'use strict';

const DB = require('../../config/database');

const madDatabase = DB.madDb;

const User = {
    // 신규 회원
    saveUser: (userinfo, id) => {
        return madDatabase
            .promise()
            .query(
                // eslint-disable-next-line max-len
                'INSERT INTO users ( `id` , `nickname` , `profile_image` , `thumbnail_image` , `reg_date` ) values(?, ?, ?, ?, CURRENT_TIMESTAMP ) ON DUPLICATE KEY UPDATE `nickname` = ?, `profile_image` = ?, `thumbnail_image` = ?, update_day = CURRENT_TIMESTAMP ',
                userinfo
            )
            .then(([rows]) => {
                return rows;
            });
    },
    // 기존 사용자 업데이트
    ourMember: (id) => {
        return madDatabase
            .promise()
            .query('UPDATE `users` SET `update_day`= CURRENT_TIMESTAMP where id=?', id)
            .then((rows) => {
                return rows;
            });
    },
};

module.exports = User;
