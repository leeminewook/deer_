const express = require("express");
const router = express.Router();
const { connection } = require("../../../dbcon");

router.get('/searchNickName',function(req,res){
    connection.connect();
  
    keyword = req.query.keyword;
    
    if(!keyword){
        console.log("검색어가 없습니다");
        return res.status(200).json({
            message:"검색어가 없습니다",
        })
    }

    connection.query('SELECT * FROM post WHERE nickName LIKE "%' + keyword + '%" ORDER BY postId DESC',function(err,result){
        
        if(err){
            console.log(err);
            return res.status(403).json({
                message:"쿼리 에러",
            })
        }
        
        if(result.length == 0){
            console.log("검색 결과 없음");
            return res.status(200).json({
                message:"검색 결과가 없습니다",
                result,
            })
        } else{
            console.log("검색 성공");
            return res.status(200).json({
                message:"검색 성공",
                result,
            })
        }
    })
})

module.exports = router;