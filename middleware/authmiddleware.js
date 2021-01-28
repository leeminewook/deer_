const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { connection } = require("../dbcon");

const secretKey = "SeCREtkeyoFdEEr"

module.exports = async(req,res,next)=>{
    const token = req.headers.token;
    if (!token){
        next();
    } else{
        const decoded =jwt.verify(token,secretKey);
    
        connection.query('Select * from user where nickName=?',[decoded.nickName],function(err,result){
            if(err) console.log(err);
            else {
                req.user = result[0];
            }
            next();
        })
    
    }
}