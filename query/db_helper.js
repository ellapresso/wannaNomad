const oracledb     = require('oracledb');

// 오라클에서는 자동커밋을 지원하지 않아, 데이터 INSERT, UPDATE, DELETE 후 조회해도 반영되지 않음.
oracledb.autoCommit = true;




const tools = function(){

    this.dbInfo = {
        user          : "system",
        password      : "oracle",
        connectString : "localhost/xe"
    }
    
    return {
        getDBInfo : function() {
            return dbInfo;
        },
        executeQuery : function(query, param, callback) {
            console.log(query);
            
            oracledb.getConnection(
                dbInfo,
                function(err, connection) {
                    if(err) {
                        console.log(err.message);
                        return;
                    }

                    connection.execute(query, param, function(err, result){
                        if(err){
                            console.log(err.message);
                            return callback(err, null);
                        }

                        console.log('ROW AFFECTED : ' + result.rowsAffected);

                        tools.doRealese(connection);
                        return callback(null, result.rows);
            
                    });
                }
            );
        },
        doRealese : function(connection) {
            connection.close(function(err){
                if(err){
                    console.log(err.message);
                    return;
                }
            });
        }
    }
}();


module.exports.tools = tools;