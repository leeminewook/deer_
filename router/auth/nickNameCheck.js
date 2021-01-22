const express=require('express');
const router= express.Router();
const { connection } = require('../../dbcon');

router.post("/nickNameCheck",function(req,res){
    connection.connect();
    const {body}=req;

    const nickName = body.nickName;

    const check_nickName=(email.replace(/(\s*)/g,""));

    if(check_nickName.length==0){
        console.log("닉네임 공백");
        return res.status(403).json({
            message:"닉네임은 공백이 될 수 없습니다",
        })
    }

    if(nickName.includes(" ")){
        console.log("닉네임 공백 포함 불가");
        return res.status(403).json({
            message:"닉네임은 공백을 포함 할 수 없습니다",
        })
    }

    connection.query('SELECT * from user where nickName=?',[nickName],function(err,result){
        if(err){
            return res.status(403).json({
                message:"쿼리 에러",
            })
        }

        if(result.length==0){
            console.log("닉네임 사용가능");
            return res.status(200).json({
                message:"닉네임 사용 가능",
            })
        }else{
            console.log("이미 있는 닉네임");
            return res.status(403).json({
                message:"이미 있는 닉네임 입니다",
            })
        }
    })
})

module.exports = router;