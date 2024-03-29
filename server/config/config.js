const fs = require('fs');
const dotenv = require('dotenv').config();

module.exports = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: '127.0.0.1',
        port: 3306,
        dialect: 'mysql'
    },
    // test: {
    //     username: process.env.DB_USER,
    //     password: process.env.DB_PASSWORD,
    //     database: process.env.DB_NAME,
    //     host: '127.0.0.1',
    //     port: 3306,
    //     dialect: 'mysql'
    // },
    // production: {
    //   username: process.env.DB_USER,
    //   password: process.env.DB_PASSWORD,
    //   database: process.env.DB_NAME,
    //   host: process.env.PROD_DB_HOSTNAME,
    //   port: process.env.PROD_DB_PORT,
    //   dialect: 'mysql'
    // }
}
