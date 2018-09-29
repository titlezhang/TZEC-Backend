module.exports={
    port: 8011,//服务端口
    cookieKey:'wtStudio',
    cookieValidTime:3600000,//cookie有效期ms
    secret:"wt$studiO 2018-7-26",//token加解密密钥
    redisConf:{//redis配置
        host:'10.2.8.165',
        port:6379
    }
}