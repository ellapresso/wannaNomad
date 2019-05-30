'use strict';

const DB = require('../../config/database');

const madDatabase = DB.madDb;
const Hash = {
    setHash: (id, hashes) => {
        if (hashes) {
            const hashArr = hashes.split(',');
            let sql = 'INSERT INTO `hashes` (pno,hContent) VALUES';
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
    deleteHash: (date, pno, hashes) => {
        if (hashes) {
            const hashArr = hashes.split(',');
            let sql = 'UPDATE `hashes` SET `isDel` = 1, `upDate`=? WHERE `pno`=? AND (';
            hashArr.forEach((i) => {
                sql += ` hContent = '${i}' OR`;
            });
            sql = sql.substring(0, sql.length - 3) + ')';
            return madDatabase
                .promise()
                .query(sql, [date, pno])
                .then((rows) => {
                    return rows;
                });
        }
    },
    rankHash: () => {
        let sql = 'SELECT GROUP_CONCAT(`ranks`.`hContent` SEPARATOR ",") AS `rankHash` FROM ';
        sql += '(SELECT count(`hno`) cnt, `hContent` FROM `hashes` h left join `posts` p ON h.`pno` = p.`pno` ';
        sql += 'WHERE p.`isDel` = 0 AND h.`isDel` = 0 GROUP BY `hContent` ORDER BY `cnt` DESC LIMIT 7) AS `ranks` ';
        return madDatabase
            .promise()
            .query(sql)
            .then(([rows]) => {
                return rows;
            });
    },
    chartHash: () => {
        const sql = 'SELECT `hContent` AS `hashTag`,count(`pno`) AS `cnt` FROM `hashes` WHERE `isDel` = 0 GROUP BY `hContent` ORDER BY count(`pno`) DESC';
        return madDatabase
            .promise()
            .query(sql)
            .then(([rows]) => {
                return rows;
            });
    },
};

module.exports = Hash;
