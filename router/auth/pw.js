const express=require('express');
const router= express.Router();
const { connection } = require('../../dbcon');

router.post('/pw',function(req,res){
    connection.connect();
    
    const {body} = req;
    const pw = body.pw;

        const pw_Check = /^(?=.*[a-zA-z])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,}$/

        if(!pw){
            console.log("비밀번호 입력 X");
            return res.status(403).json({
                message:"비밀번호를 입력하지 않았습니다",
            })
        }

        if(pw.includes(" ")){
            console.log("비번공백 포함");
            return res.status(403).json({
                message:"비밀번호에 공백을 포함할 수 없습니다",
            })
        }
        
        if(!(pw_Check.test(pw))){
            console.log("알맞지 않는 비밀번호 형식");
            return res.status(403).json({
                message:"알맞지 않은 비밀번호 형식입니다",
            })
        }else{
            console.log("알맞은 비밀번호");
            return res.status(200).json({
                message:"알맞은 비밀번호",
            })
        }


})

module.exports = router;