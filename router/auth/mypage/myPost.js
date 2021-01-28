const express = require("express");
const router = express.Router();
const { connection } = require("../../../dbcon");


router.get('/myPost',function(req,res){
    connection.connect();

    const {user} = req;

    if(!user.nickName){
        console.log("로그인을 먼저해주십시오");
        return res.status(401).json({
            message:"토큰 없음",
        })
    }

    const nickName = user.nickName;

    connection.query('SELECT * FROM post WHERE nickName=? ORDER BY postId DESC',[nickName],function(err,result){
        if(err){
            console.log(err);
            return res.status(403).json({
                message:"쿼리 에러",
            })
        }
        if(result.length==0){
            console.log("게시한 게시물이 없습니다");
            return res.status(200).json({
                message:"게시한 게시물이 없습니다",
                result,
            })
        }else{
            console.log("게시물을 불러왔습니다");
            return res.status(200).json({
                message:"게시물을 불러왔습니다",
                result,
            })
        }
    })

})

module.exports = router;
