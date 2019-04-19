const mysql = require('mysql2');
require('dotenv').config();

const madDatabase = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASS,
    database: process.env.MADDB,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

madDatabase.connect();

module.exports = madDatabase;
