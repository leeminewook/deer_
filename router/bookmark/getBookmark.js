const express = require("express");
const router = express.Router();
const { connection } = require("../../dbcon");

router.get('/getBookmark',function(req,res){
    connection.connect();

    const{user}=req;

    if(!user){
        console.log("로그인해");
        return res.status(401).json({
            message:"토큰없음",
        })
    }


    const nickName=user.nickName;


    connection.query('SELECT * from post inner join(SELECT * FROM bookmark WHERE nickName=? ORDER BY bookmarkidx DESC)jointable WHERE post.postId=jointable.postId ORDER BY bookmarkidx DESC',[nickName],function(err,result){
        if(err){
            console.log(err);
            return res.status(403).json({
                message:"쿼리 에러",
            })
        }
        if(result.length==0){
            console.log("즐겨찾기에 등록된 글이 없습니다");
            return res.status(200).json({
                message:"즐겨찾기에 등록된 글이 없습니다",
                result,
            })
        }else{
            console.log("즐겨찾기 불러오기 성공");
            return res.status(200).json({
                message:"즐겨찾기 불러옴",
                result,
            })
        }

        
    })

})

module.exports = router;


