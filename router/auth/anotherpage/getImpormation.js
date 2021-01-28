const express = require("express");
const router = express.Router();
const { connection } = require("../../../dbcon");

router.get('/impormation/:nickName',function(req,res){
    connection.connect();

    const nickName = req.params.nickName;

    if(!nickName){
        console.log("잘못된 값 전달");
        return res.status(401).json({
            message:"값이 전달되지 않음",
        })
    }

    connection.query('SELECT * FROM user WHERE nickName=?',[nickName],function(err,result){
        if(err){
            console.log(err);
            return res.status(403).json({
                message:"쿼리 에러",
            })
        }

        if(result.length==0){
            console.log("회원이 아닙니다");
            return res.status(403).json({
                message:"회원정보가 없습니다",
                result,
            })
        }else{
            console.log("회원정보를 불러옴");
            return res.status(200).json({
                messaeg:"회원정보를 불러왔습니다",
                result,
            })
        }
    })
})

module.exports = router;