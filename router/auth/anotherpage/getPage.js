const express = require("express");
const router = express.Router();
const { connection } = require("../../../dbcon");

router.get('/getPage/:nickName',function(req,res){
    connection.connect();

    const nickName = req.params.nickName;

    if(!nickName){s
        console.log("잘못된 값 전달");
        return res.status(401).json({
            message:"값이 전달되지 않음",
        })
    }

    connection.query('SELECT * FROM post WHERE nickName=? ORDER BY postId DESC',[nickName],function(err,result){
        if(err){
            console.log(err);
            return res.status(403).json({
                message:"쿼리 에러",
            })
        }
        if(result.length==0){
            console.log("게시한 글이 없습니다");
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