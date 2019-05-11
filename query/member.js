const dbHelper     = require('./db_helper');

const query = function(){

    return {
        getMembers(callback) {
            const query = 'SELECT * FROM NANO_MEMBER';
            dbHelper.tools.executeQuery(query, callback)
        },
        insertMembers(params, callback) {
            const query = 
            `INSERT INTO NANO_MEMBER
             VALUES(
                (SELECT 'M' || LPAD(TO_CHAR(TO_NUMBER(NVL(SUBSTR(MAX(V_MEMBERCD), 2, 9), '0')) + 1), 8, '0') FROM NANO_MEMBER), 
                (SELECT ROUND(DBMS_RANDOM.VALUE(10000,99999), 0) FROM DUAL), 
                '강승윤', 
                null, 
                'PC', 
                TO_CHAR(SYSDATE, 'YYYYMMDDHH24MISS'), 
                TO_CHAR(SYSDATE, 'YYYYMMDDHH24MISS'), 
                '1234'
            )`;
            dbHelper.tools.executeQuery(query, callback)
        }
    }
}();


module.exports.query = query;