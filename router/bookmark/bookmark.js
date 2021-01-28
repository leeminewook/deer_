//무슨 글인지 누가 눌렀는지
const express = require("express");
const router = express.Router();
const { connection } = require("../../dbcon");

router.post('/bookmark',function(req,res){
    connection.connect();

    const { body,user } = req;

    const postId = body.postId;
    const nickName = user.nickName;
    console.log(user);
    if(!postId){
        console.log("즐겨찾기를 하지 않았습니다");
        return res.status(403).json({
            message:"즐겨찾기를 하지 않았습니다",
        })
    }

    if(!nickName){
        console.log("로그인을 먼저 해주십시오");
        return res.status(401).json({
            message:"로그인을 먼저 해주십시오",
        })
    }

    connection.query('INSERT INTO bookmark(postId,nickName) VALUES(?,?)',[postId,nickName],function(err,result){
        if(err){
            console.log(err);
            return res.status(403).json({
                message:"쿼리 에러",
            })
        }else{
            console.log("즐겨찾기 완료");
            return res.status(200).json({
                message:"즐겨찾기에 등록되었습니다",
                result,
            })
        }
    })

})

module.exports = router;