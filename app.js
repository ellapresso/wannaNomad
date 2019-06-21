const express      = require('express');
const serveStatic  = require("serve-static")
const path         = require('path');
const cors         = require('cors');
const parseurl       = require('parseurl');
// post 방식으로 넘어온 data 조회를 위한 모듈
const bodyParser     = require('body-parser');
const expressSession = require('express-session');

const member       = require('./query/member');
const post         = require('./query/post');


/* APP SERVER 기본 설정 */
app = express();
app.use(serveStatic(path.join(__dirname, 'dist')));

const port = process.env.PORT || 5000;
app.listen(port);

//vue SPA에 대한 rewriting rule 지정
app.route('/*').get((request, response) => {
    response.sendFile(path.join(__dirname + '/dist/index.html'));
});


//--------------------------------------------------------------------------------//




var whitelist = ['http://localhost:5000', 'http://localhost:5001', 'http://localhost:8081', 'http://api.openweathermap.org'];
var corsOptions = {
    origin: function(origin,callback)    {
        if(whitelist.indexOf(origin) !== -1){
            callback (null,true);
        } else{
            callback (new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'OPTIONS'], 
    credentials: true,
}

api = express();
api.use(serveStatic(path.join(__dirname, 'dist')));
api.use(cors(corsOptions));
api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json())

api.use(expressSession({
    secret: "1234567890QWERTY",
    resave: false,
    saveUninitialized: true
}));

const apiPort = process.env.PORT || 5001;
api.listen(apiPort);

api.post('/api/member/check', (request, response) => {
    const userSession = request.session.userInfo;
    console.log('check : ', userSession);
    response.send(userSession);
});

api.post('/api/member/logout', (request, response) => {
    console.log(request.session.userInfo);
    if (request.session.userInfo) {
        request.session.destroy(
            function (err) {
                if (err) {
                    return;
                }
                response.send('ok');
            }
        );

    } else {
        response.send('fail');
    }
});

api.post("/api/member/login", (request, response) => {
    const params = [
        request.body.id,
        request.body.password
    ];

    member.query.getMember(params, (err, result) => {

        const resultObj = {};

        (!result.length) ? resultObj.status = 'fail' : resultObj.status = 'ok';
        if(result.length) {
            const userInfo = result[0];
            resultObj.id = userInfo[1];
            resultObj.name = userInfo[2];
            resultObj.profile = userInfo[3];

            request.session.userInfo = resultObj;
            request.session.save(() => {
                response.json(resultObj);
            });
        }

        
    });
});

api.post("/api/member/join", (request, response) => {
    const params = [
        request.body.id,
        request.body.password
    ];

    member.query.insertMembers(params, (err, result) => {
        (err) ? response.send("fail") : response.send("ok");
    });
});

// /api/post/today
api.get("/api/post/today", (request, response) => {
    const params = [];

    post.query.getTodayPosts(params, (err, result) => {
        response.json(result);
    });
});

api.post("/api/post/today", (request, response) => {
    const userSession = request.session.userInfo;
    const title = request.body.title;
    const content = request.body.content;
    const action  = request.body.action;
    const itemCd  = request.body.itemCd;

    console.log('body', request.body);

    if(!userSession) {
        let result = {
            status : 'fail',
            message : '로그인 후 이용해주세요.',
            redirectPath : '/login'
        }

        response.json(result);
    }

    if(action === 'write'){ 
        const params = [
            userSession.id,
            userSession.name,
            userSession.profile,
            title,
            content
        ];

        post.query.insertTodayPost(params, (err, result) => {
            if(!result) {
                result = {
                    status: 'ok',
                    action: action
                }
            }

            response.json(result);
        });
    }else if(action === 'edit') {
        const params = [
            title,
            content,
            userSession.id,
            itemCd
        ];

        post.query.updateTodayPost(params, (err, result) => {
            if(!result) {
                result = {
                    status: 'ok',
                    action: action
                }
            }

            response.json(result);
        });
    }else if(action === 'delete'){
        const params = [
            userSession.id,
            itemCd
        ];

        post.query.deleteTodayPost(params, (err, result) => {
            if(!result) {
                result = {
                    status: 'ok',
                    action: action
                }
            }

            response.json(result);
        });
    }
});