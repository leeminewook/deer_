const express = require("express");
const router = express.Router();
const { connection } = require("../../dbcon");

router.delete('/deleteBookmark/:bookmarkidx',function(req,res){
    connection.connect();

    const bookmarkidx = req.params.bookmarkidx;

    if(!bookmarkidx){
        console.log("즐겨찾기 안함");
        return res.status(403).json({
            message:"즐겨찾기 안함",
        })
    }

    connection.query('SELECT * FROM bookmark WHERE bookmarkidx=?',[bookmarkidx],function(err,result){
        if(err){
            console.log(err);
            return res.status(403).json({
                message:"쿼리 에러",
            })
        }
        if(result.length==0){
            console.log("이미 삭제된 즐겨찾기입니다");
            return res.status(403).json({
                message:"이미 삭제된 즐겨찾기입니다",
                result,
            })
        }else{
            connection.query('DELETE FROM bookmark WHERE bookmarkidx=?',[bookmarkidx],function(err,result){
                if(err){
                    console.log(err);
                    return res.status(403).json({
                        message:"쿼리 에러",
                    })
                }else{
                    console.log("삭제 완료");
                    return res.status(200).json({
                        message:"북마크 삭제완료",
                        result,
                    })
                }
            })
        }
    })

})

module.exports = router;