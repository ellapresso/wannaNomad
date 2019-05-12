'use strict';

const DB = require('../../config/database');

const madDatabase = DB.madDb;
const Hash = {
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
    deleteHash: (date, pno, hashes) => {
        if (hashes) {
            const hashArr = hashes.split(',');
            let sql = 'UPDATE `hashes` SET `isDel` = 1, `upDate`=? where `pno`=? and (';
            hashArr.forEach((i) => {
                sql += ` hContent = '${i}' or`;
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
        return madDatabase
            .promise()
            // eslint-disable-next-line max-len
            .query('select GROUP_CONCAT(`ranks`.`hContent` SEPARATOR ",") as `rankHash` from (select count(`hno`) cnt, `hContent` from `hashes` h left join `posts` p on h.`pno` = p.`pno` where p.`isDel` = 0 and h.`isDel` = 0 group by `hContent` order by `cnt` desc limit 7) as `ranks` ')
            .then(([rows]) => {
                return rows;
            });
    },
    chartHash: () => {
        return madDatabase
            .promise()
            .query(' select `hContent` as `hashTag`,count(`pno`) as `cnt` from `hashes` where `isDel` = 0 group by `hContent` order by count(`pno`) desc')
            .then(([rows]) => {
                return rows;
            });
    },
};

module.exports = Hash;
