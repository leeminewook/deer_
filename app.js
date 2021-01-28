const express = require("express");//node server 사용할때 epress필요
const app = express();
const cors = require('cors');

const register = require('./router/auth/register/register');
const login = require('./router/auth/login');
const pw = require('./router/auth/register/pw');
const emailCheck = require('./router/auth/register/emailCheck');
const nickNameCheck = require('./router/auth/register/nickNameCheck');
const idCheck = require('./router/auth/register/idCheck');
const postMenu = require('./router/post/Menu/postMenu');
const getMains = require('./router/post/getMains');
const searchTitle = require('./router/post/search/searchTitle');
const searchFood = require('./router/post/search/searchFood');
const searchNickName = require('./router/post/search/searchNickName');
const deleteMenu = require('./router/post/Menu/deleteMenu');
const getMenu = require('./router/post/getMenu');
const createComment = require('./router/comment/createComment');
const deleteComment = require('./router/comment/deleteComment');
const authmiddleware = require('./middleware/authmiddleware');
const bookmark = require('./router/bookmark/bookmark');
const getBookmark = require('./router/bookmark/getBookmark');
const deleteBookmark = require('./router/bookmark/deleteBookmark');
const mypage = require('./router/auth/mypage/mypage');
const myPost = require('./router/auth/mypage/myPost');
const getPage = require('./router/auth/anotherpage/getPage');
const getImpormation = require('./router/auth/anotherpage/getImpormation');

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(authmiddleware);
app.use(register,login,pw,emailCheck,nickNameCheck,idCheck,postMenu,getMains,searchTitle,searchFood,searchNickName,deleteMenu,getMenu,createComment,deleteComment,bookmark,getBookmark,deleteBookmark,mypage,myPost,getPage,getImpormation);

app.listen(8080, () => {
    console.log("server start");
})

module.exports = app;