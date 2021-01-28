const express = require("express");
const router = express.Router();
const { connection } = require("../../../dbcon");

router.put('/updatePw/:pw',function(req,res){
    connection.connect();

    const pw = req.params.pw;

    if(!pw){
        console.log("값을 전달받지 못했습니다");
        return res.status(403).json({
            message:"요청없음",
        })
    }

    connection.query('UPDATE user SET pw=? WHERE pw=?',[firstpw])

})