const express=require('express');
const router= express.Router();
const { connection } = require('../../dbcon');

router.post("/emailCheck",function(req,res){
    connection.connect();
    const {body} = req;

    const email = body.email;

    const check_email=(email.replace(/(\s*)/g,""));

    if(check_email.length==0){
        console.log("이메일은 공백이 될 수 없습니다");
        return res.status(403).json({
            message:"이메일은 공백이 될 수 없습니다",
        })
    }

    if(email.includes(" ")){
        console.log("이메일 공백 포함");
        return res.status(403).json({
            message:"이메일은 공백을 포함 할 수 없습니다",
        })
    }

    if(email.includes("@")){
        console.log("성공");
    }else{
        return res.status(403).json({
            message:"이메일 형식이 아닙니다",
        })
    }

    connection.query('SELECT * from user where email=?',[email],function(result,err){
        if(err){
            console.log(err);
        }

        if(result.length==0){
            console.log("사용 가능 이메일");
            return res.status(200).json({
                message:"사용 가능한 이메일 입니다",
            })
        }else{
            console.log("이미 있는 이메일");
            return res.status(403).json({
                message:"이미 있는 이메일 입니다",
            })
        }
    })
})

module.exports = router;