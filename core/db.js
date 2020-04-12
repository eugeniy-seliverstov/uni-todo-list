const mysql = require('mysql2');
const { database } = require('../config');

const pool = mysql.createPool(database);
const promisePool = pool.promise();

promisePool.query("SELECT 1")
    .then(() => console.log('Successfully connected to the database!'))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });

module.exports = promisePool;