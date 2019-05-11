const express      = require('express');
const serveStatic  = require("serve-static")
const path         = require('path');
const cors         = require('cors');

const member       = require('./query/member');


/* APP SERVER 기본 설정 */
app = express();
app.use(serveStatic(path.join(__dirname, 'dist')));


var whitelist = ['http://localhost', 'http://localhost:8081', 'https://nano-community.herokuapp.com'];
var corsOptions = {
    origin: function(origin,callback)    {
        if(whitelist.indexOf(origin) !== -1){
            callback (null,true);
        } else{
            callback (new Error('Not allowed by CORS'))
        }
    }
}

const port = process.env.PORT || 5000;
app.listen(port);

//vue SPA에 대한 rewriting rule 지정
app.route('/*').get(function(request, response) {
    response.sendFile(path.join(__dirname + '/dist/index.html'));
});


/* API SERVER */
api = express();
api.use(serveStatic(path.join(__dirname, 'dist')));
api.use(cors(corsOptions));
const apiPort = process.env.PORT || 5001;
api.listen(apiPort);


api.get("/api/member", (request, response) => {
    member.query.getMembers(function(err, result){
        response.send(result);
    });
});

api.post("/api/member", (request, response) => {

    console.log(request.body);

    member.query.insertMembers(null, function(err, result){
        response.send("ok");
    });
});