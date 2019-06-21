const dbHelper     = require('./db_helper');


// TODO.
// 윤지 리파지토리를 참고해서, model/controller 패턴으로 구성이 가능하도록 변경
const query = function(){

    return {
        getMember(params, callback) {
            const query = 
            `SELECT * FROM NANO_MEMBER
             WHERE  V_MEMBERID = :ID
             AND    V_PASSWORD = :PASSWORD
            `;
            dbHelper.tools.executeQuery(query, params, callback);
        },
        insertMembers(params, callback) {
            const query = 
            `INSERT INTO NANO_MEMBER
             VALUES(
                (SELECT 'M' || LPAD(TO_CHAR(TO_NUMBER(NVL(SUBSTR(MAX(V_MEMBERCD), 2, 9), '0')) + 1), 8, '0') FROM NANO_MEMBER), 
                :ID, 
                '강승윤', 
                null, 
                'PC', 
                TO_CHAR(SYSDATE, 'YYYYMMDDHH24MISS'), 
                TO_CHAR(SYSDATE, 'YYYYMMDDHH24MISS'), 
                :PASSWORD
            )`;
            dbHelper.tools.executeQuery(query, params, callback);
        }
    }
}();


module.exports.query = query;