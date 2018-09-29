const Redis=require('ioredis');
const WTConfig=require('../../WTConfig');
const redis=new Redis(WTConfig.redisConf);
module.exports=redis;