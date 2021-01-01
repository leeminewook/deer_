const express=require('express');
const router= express.Router();
const { connection } =require('../../dbcon');

router.post("/idCheck",function(req,res){
    connection.connect();
    const {body} = req;
    const id = body.id;

    const check_id=(id.replace(/(\s*)/g,""));

    if(check_id.length==0){
        console.log("아이디 공백 불가");
        return res.status(403).json({
            message:"아이디는 공백이 될 수 없습니다",
        })
    }

    if(id.includes(" ")){
        console.log("아이디 공백 포함 불가");
        return res.status(403).json({
            message:"아이디는 공백을 포함할 수 없습니다",
        })
    }

    connection.query('SELECT * from user where id=?',[id],function(result,err){
        if(err){
            console.log(err);
            return res.status(403).json({
                message:"쿼리문 에러",
            })
        }
        
        if(result.length==0){ 
            console.log("아이디 사용가능");
            return res.status(200).json({
                message:"아이디 사용 가능",
            })
        }else{
            console.log("중복된 아이디");
            return res.status(403).json({
                message:"중복된 아이디 있음",
            })
        }
    })
})

module.exports = router;