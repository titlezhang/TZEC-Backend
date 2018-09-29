const jwt = require('jsonwebtoken');
const WTConfig=require('../../WTConfig');
module.exports={
    createToken:function(userInfo){
        if(userInfo){
            userInfo.time=new Date().toUTCString();
            let tokenStr=JSON.stringify(userInfo);
            return jwt.sign(tokenStr,WTConfig.secret);
        }else{
            throw new Error('user info error!!!');
        }
    }
}