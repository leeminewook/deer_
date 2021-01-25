const express = require("express");
const { connect } = require("../../app");
const router = express.Router();
const { connection } = require("../../dbcon");

router.post('/cComment/:postId',function(req,res){
    connection.connect();

    const {body}=req;

    const postId = req.params.postId;

    const commentTitle = body.commentTitle;
    const nickName = body.nickName;
    const commentText = body.commentText;

    const commentTitle_Check = (commentTitle.replace(/(\s*)/g,""));
    const commentText_Check = (commentText.replace(/(\s*)/g,""));

    if(!commentTitle||!commentText){
        console.log("댓글 제목과 내용은 필수입니다");
        return res.status(403).json({
            messaeg:"제목과 내용은 필수입니다",
        })
    }
    if(!nickName){
        console.log("로그인을 먼저 해주십시오");
        return res.status(403).json({
            message:"로그인을 먼저 해주십시오",
        })
    }

    if(commentTitle_Check.length==0){
        console.log("제목은 공백이 될 수 없습니다");
        return res.status(403).json({
            message:"제목은 공백이 될 수 없습니다",
        })
    }

    if(commentText_Check.length==0){
        console.log("내용은 공백이 될 수 없습니다");
        return res.status(403).json({
            message:"내용은 공백이 될 수 없습니다",
        })
    }
    connection.query('SELECT * FROM post WHERE postId=?',[postId],function(err,result){
        if(err){
            console.log(err);
            return res.status(403).json({
                message:"쿼리 에러",
            })
        }

        if(result.length==0){
            console.log("없는 게시글 입니다");
            return res.status(403).json({
                message:"없는 게시글 입니다",
            })
        }else{
            connection.query('INSERT INTO comment(postId,commentTitle,nickName,commentText,cPostTime) VAlUES(?,?,?,?,now())',[postId,commentTitle,nickName,commentText],function(err,result){
                if(err){
                    console.log(err);
                    return res.status(403).json({
                        message:"쿼리 에러",
                    })
                }else{
                    console.log(result);
                    return res.status(200).json({
                        message:"댓글 작성 완료",
                        result,
                    })
                }
            })
        }
    })

})

module.exports = router;