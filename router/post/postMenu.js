const express=require('express');
const router= express.Router();
const { connection } = require('../../dbcon');

router.post("/post",function(req,res){
    connection.connect();
    const {body} = req;

    const nickName = body.nickName;
    const postTitle = body.postTitle;
    const food = body.food;
    const postFile = body.postFile;
    const postImage = body.postImage;

    const check_Title = (postTitle.replace(/(\s*)/g,""));
    const check_food = (food.replace(/(\s*)/g,""));

    if(!postTitle||!food){
        console.log("제목 혹은 재료가 없음");
        return res.status(403).json({
            message:"제목과 재료는 필수 입니다",
        })
    }

    if(check_Title.length==0){
        console.log("제목은 공백이 될 수 없습니다");
        return res.status(403).json({
            message:"제목은 공백이 될 수 없습니다",
        })
    }

    if(check_food.length==0){
        console.log("재료는 공백이 될 수 없습니다");
        return res.status(403).json({
            message:"재료는 공백이 될 수 없습니다",
        })
    }

    //제목,재료,영상,사진,내용,작성시간
    connection.query('INSERT INTO post(postTitle,nickName,food,postTime,postFile,postImage) VALUES(?,?,?,now(),?,?)',[postTitle,nickName,food,postFile,postImage],function(err,result){
        if(err){
            console.log(err);
            return res.status(403).json({
                message:"쿼리 에러",
            })
        } else {
            console.log(result);
            return res.status(200).json({
                message:"글 게시 성공",
                result,
            })
        }
    })
})

module.exports = router;