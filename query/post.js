const dbHelper     = require('./db_helper');


// TODO.
const query = function(){

    return {
        getTodayPosts(params, callback) {
            const query = 
            `SELECT * FROM (
                SELECT
                    ROW_NUMBER() OVER(ORDER BY V_REG_DTM DESC) N_SEQ,
                    V_POSTCD,
                    V_MEMBERID,
                    V_MEMBERNM,
                    NVL(V_PROFILE, '/images/default-profile.png') AS V_PROFILE,
                    V_TITLE,
                    V_CONTENT,
                    (SELECT NVL(COUNT(*), 0) FROM NANO_POST_LIKE NPL
                     WHERE NPL.V_POSTCD = NTP.V_POSTCD) AS N_LIKE_CNT
                FROM NANO_TODAY_POST NTP
            )
            WHERE N_SEQ <= 5
            `;
            dbHelper.tools.executeQuery(query, params, callback);
        },
        insertTodayPost(params, callback) {
            const query = 
            `INSERT INTO NANO_TODAY_POST
                VALUES(
                (SELECT 'T' || LPAD(TO_CHAR(TO_NUMBER(NVL(SUBSTR(MAX(V_POSTCD), 2, 9), '0')) + 1), 8, '0') FROM NANO_TODAY_POST), 
                :ID, 
                :MEMBERNM, 
                :PROFILE, 
                null,
                :TITLE, 
                :CONTENT, 
                TO_CHAR(SYSDATE, 'YYYYMMDDHH24MISS'),
                TO_CHAR(SYSDATE, 'YYYYMMDDHH24MISS'), 
                'N'
            )`;
            dbHelper.tools.executeQuery(query, params, callback);
        },
        updateTodayPost(params, callback) {
            const query = 
            `UPDATE NANO_TODAY_POST
             SET V_TITLE = :TITLE,
                 V_CONTENT = :CONTENT
             WHERE  1 = 1
             AND    V_MEMBERID = :ID
             AND    V_POSTCD = :POSTCD
            `;
            dbHelper.tools.executeQuery(query, params, callback);
        },
        deleteTodayPost(params, callback) {
            const query = 
            `DELETE FROM NANO_TODAY_POST
             WHERE  1 = 1
             AND    V_MEMBERID = :ID
             AND    V_POSTCD = :POSTCD
            `;
            dbHelper.tools.executeQuery(query, params, callback);
        },
    }
}();


module.exports.query = query;