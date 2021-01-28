const express=require('express');
const router= express.Router();
const jwt = require("jsonwebtoken");
const { connection } = require('../../dbcon');
const secretKey = "SeCREtkeyoFdEEr"
router.post('/login',function(req,res){
  connection.connect();
  
  const {body}=req;
  
  const id = body.id;
  const pw = body.pw;

  if(!id||!pw){
      console.log("입력 하지않은 칸 존재");
      return res.status(403).json({
          message:"입력하지 않은 칸이 존재합니다",
      })
  }

  connection.query("SELECT * from user where id=? and pw=?",[id,pw],function(err,result){
      if(err){
          console.log(err);
          return res.status(403).json({
              message:"쿼리 에러",
          })
      }

      if(result.length==0){
          console.log("잘못된 정보");
          return res.status(403).json({
              message:"알맞은 정보가 아닙니다",
          })
      }else{
          const token =jwt.sign({
              id:result[0].id,
              nickName:result[0].nickName,
              name:result[0].name,
          },
          secretKey, {
              expiresIn:'7d',
          });
          console.log("로그인 성공");
          return res.status(200).json({
            message:"로그인 성공",
            token:{
                token,
            }
          })
      }
  })
})

module.exports=router;