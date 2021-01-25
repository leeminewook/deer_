const express = require("express");
const router = express.Router();
const { connection } = require("../../dbcon");

router.get('/getMenu/:postId',function(req,res){
    connection.connect();

    const postId= req.params.postId;

    connection.query('SELECT * FROM post WHERE postId=?',[postId],function(err,result){
        console.log(postId);
        if(err){
            console.log(err);
            return res.status(403).json({
                message:"쿼리 에러",
            })
        }

        if(result.length==0){
            console.log("없는 글입니다");
            return res.status(200).json({
                message:"삭제된 글입니다",
                result,
            })
        }else{
            console.log("글 불러오기 성공");
            return res.status(200).json({
                messaeg:"글을 불러 왔습니다",
                result,
            })
        }
    })

})

module.exports = router;