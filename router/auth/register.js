const express=require('express');
const router= express.Router();
const { connection } = require('../../dbcon');

router.post("/register",function(req,res){
    connection.connect();
    const {body}=req;

    const email=body.email;
    const id=body.id;
    const pw=body.pw;
    const nickName=body.nickName;
    const name=body.name;

    console.log(body);
    if(!name){
        console.log("이름 공백");
        return res.status(403).json({
            message:"이름은 공백이 될 수 없습니다",
        })
    }
    if(!pw){
        console.log("비번공백");
        return res.status(403).json({
            message:"비밀번호는 공백이 될수 없습니다",
        })
    }
    
    if(name.includes(" ")){
        console.log("이름공백 포함");
        return res.status(403).json({
            message:"이름에 공백을 포함할 수 없습니다",
        })
    }
    if(pw.includes(" ")){
        console.log("비번공백 포함");
        return res.status(403).json({
            message:"비밀번호에 공백을 포함할 수 없습니다",
        })
    }

    

    connection.query('INSERT INTO user(id,pw,nickName,name,email) VALUES(?,?,?,?,?)',[id,pw,nickName,name,email],function(err,result){
        if(err){
            console.log(err);
           return res.status(403).json({
                message:"회원가입 실패",
            })
        }else{
            console.log(result);
            return res.status(200).json({
                message:"회원가입 성공",
            })
        }
        
    })
})

module.exports = router;