/* eslint-disable max-len */
'use strict';

const DB = require('../../config/database');

const madDatabase = DB.madDb;
const Post = {
    getPost: (userId) => {
        let sql =
            'select `posts`.`pno`,`users`.`nickname` as `writer`,`title`,`contents`,`hashes`,`likes`.`lCount` as `likes`,`wrDate`,`upDate`,`users`.`thumbnail_image` as `thumbnail_image`';
        if (userId) {
            sql += ', if(users.id=' + userId + ', true, false) as nowUser';
        }
        // TODO 걍 너무 길어서 대충 잘라 놓음
        sql += ' from `posts` join(select `pno`, GROUP_CONCAT(`hContent` SEPARATOR ",") as `hashes` from `hashes` where `isDel` = 0 group by `pno`) `hash` on `posts`.`pno` = `hash`.`pno` left join `likes` on `posts`.`pno` = `likes`.`pno`';
        sql += ' left join `users` on `users`.`id` = `posts`.`writer` where `posts`.`isDel`= 0';
        sql += ' order by `posts`.`pno` desc';
        return madDatabase
            .promise()
            .query(sql)
            .then(([rows]) => {
                return rows;
            });
    },
    setPost: (contents) => {
        return madDatabase
            .promise()
            .query('INSERT INTO `posts` ( `title`, `contents`, `writer`, `wrDate`) VALUES (?,?, ?, ?)', contents)
            .then(([rows]) => {
                return rows;
            });
    },
    setHash: (id, hashes) => {
        if (hashes) {
            const hashArr = hashes.split(',');
            let sql = 'insert into hashes (pno,hContent) values';
            hashArr.forEach((i) => {
                sql += `(${id},'${i}'),`;
            });
            sql = sql.substring(0, sql.length - 1);
            return madDatabase
                .promise()
                .query(sql)
                .then(([rows]) => {
                    return rows;
                });
        }
        return null;
    },
    updatePost: (contents) => {
        return madDatabase
            .promise()
            .query('UPDATE `posts` SET `title`=?, `contents`=?, `writer`=?, `upDate`=? where pno =?', contents)
            .then(([rows]) => {
                return rows;
            });
    },
    deletePost: (delInfo) => {
        return madDatabase
            .promise()
            .query('UPDATE `posts` SET `isDel` = 1, `upDate`=? where `pno`=? and `writer`=?', delInfo)
            .then((rows) => {
                return rows;
            });
    },
    deleteHash: (delInfo) => {
        return madDatabase
            .promise()
            .query('UPDATE `hashes` SET `isDel` = 1, `upDate`=? where `pno`=? and `hContent`=?', delInfo)
            .then((rows) => {
                return rows;
            });
    },
};

module.exports = Post;
