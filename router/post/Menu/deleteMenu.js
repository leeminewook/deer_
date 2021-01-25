const express = require("express");
const router = express.Router();
const { connection } = require("../../../dbcon");

router.delete('/deleteMenu/:postId',function(req,res){
    connection.connect();

    const postId = req.params.postId;

    
    connection.query('SELECT * FROM post WHERE postId=?',[postId],function(err,result){
        if(err){
            console.log(err);
            return res.status(403).json({
                message:"쿼리 에러",
            })
        }
        if(result.length==0){
            console.log("이미 삭제된 글입니다");
            return res.status(200).json({
                message:"이미 삭제된 글입니다",
                result,
            })
        }else{
            connection.query('DELETE FROM post WHERE postId=?',[postId],function(err,result){
                if(err){
                    console.log(err);
                    return res.status(403).json({
                        message:"쿼리 에러",
                    })
                }else{
                    console.log("삭제 성공");
                    return res.status(200).json({
                        message:"삭제 완료",
                        result,
                    })
                }
            })
        
        }
    })
})

module.exports = router;