const express = require("express");//node server 사용할때 epress필요
const app = express();
const cors = require('cors');

const register = require('./router/auth/register');
const login = require('./router/auth/login');
const pw = require('./router/auth/pw');
const emailCheck = require('./router/auth/emailCheck');
const nickNameCheck = require('./router/auth/nickNameCheck');
const idCheck = require('./router/auth/idCheck');

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(register,login,pw,emailCheck,nickNameCheck,idCheck);

app.listen(8080, () => {
    console.log("server start");
})

module.exports = app;