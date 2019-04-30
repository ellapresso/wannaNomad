const express      = require('express');
const serveStatic  = require("serve-static")
const path         = require('path');

console.log(__dirname);

app = express();
app.use(serveStatic(path.join(__dirname, 'dist')));
const port = process.env.PORT || 5000;
app.listen(port);

app.route('/*').get(function(req, res) {
    console.log(req);
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});