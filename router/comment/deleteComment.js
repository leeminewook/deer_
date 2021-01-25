const express = require("express");
const router = express.Router();
const { connection } = require("../../dbcon");

router.delete('/dComment/:commentId',function(req,res){
    connection.connect();

    const commentId = req.params.commentId;

    connection.query('SELECT * FROM comment Where commentId=?',[commentId],function(err,result){
        if(err){
            console.log(err);
            return res.status(403).json({
                message:"쿼리 에러",
            })
        }

        if(result.length==0){
            console.log("댓글 없음");
            return res.status(403).json({
                message:"이미 삭제된 댓글 입니다",
                result,
            })
        }else{
            connection.query('DELETE FROM comment WHERE commentId=?',[commentId],function(err,result){
                if(err){
                    console.log(err);
                    return res.status(403).json({
                        message:"쿼리 에러",
                    })
                }else{
                    console.log("삭제 성공");
                    return res.status(200).json({
                        message:"댓글이 삭제되었습니다",
                        result,
                    })
                }
                
            })
        }
    })

})

module.exports = router;