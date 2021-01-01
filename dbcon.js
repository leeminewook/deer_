const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

exports.connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'1234',
    database:'deer'
});

