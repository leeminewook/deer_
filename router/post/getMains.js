const express=require('express');
const router= express.Router();
const { connection } = require('../../dbcon');

router.get('/mainHome',function(req,res){

    connection.connect();

    connection.query('SELECT * from post ORDER BY postId DESC',function(err,result){
        if(err){
            console.log(err);
            return res.status(403).json({
                message:"쿼리에러",
            })
        }
        
        if(result.length==0){
            console.log("글이 없습니다");
            return res.status(200).json({
                message:"글이 없습니다",
            })
        }
        else{
            console.log("메인화면 불러오기 성공");
            return res.status(200).json({
                message:"불러오기 성공",
                result,
            })
        }
    })

})

module.exports = router;