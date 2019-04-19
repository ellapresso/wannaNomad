'use strict';

const DB = require('../../config/database');

const madDatabase = DB.madDb;
const Post = {
    getPost: () => {
        return madDatabase
            .promise()
            .query('select * from posts order by pno desc')
            .then(([rows]) => {
                return rows;
            });
    },
    setPost: (contents) => {
        return madDatabase
            .promise()
            .query('INSERT INTO `posts` ( `title`, `contents`, `writer`, `wrDate`) VALUES (?,?, ?, CURRENT_TIMESTAMP)', contents)
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
            .query('UPDATE `posts` SET `title`=?, `contents`=?, `writer`=?, `upDate`=CURRENT_TIMESTAMP where pno =?', contents)
            .then(([rows]) => {
                return rows;
            });
    },
};

module.exports = Post;
