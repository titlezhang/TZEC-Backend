const package = require('./package.json');
const WTConfig = require('./WTConfig');
const Koa = require('koa');//koa框架
const cors = require('koa2-cors');
const WTRouter = require('./WTRouter');//路由集合
const koaBody = require('koa-body');//处理提交的表单
const ResUtils=require('./src/common/ResUtils');
const ResCode=require('./src/common/ResCode');
const util = require('util');
const jwt = require('jsonwebtoken');//jwt模块
const verify = util.promisify(jwt.verify);//jwt解析
const app = new Koa();//创建koa应用
const urlPre = WTConfig.urlPre;//访问本应用的前缀
app.use(cors({
    origin: function (ctx) {
        //return "*"; 允许来自所有域名请求
        return 'http://localhost:8000';
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

//处理表单请求，以便在ctx.request.body中能获取到表单的请求数据
app.use(koaBody({
    multipart:true,//支持文件上传
}));

const secret = WTConfig.secret;

//登录检查
app.use(async (ctx, next) => {
    ctx.ResUtils=ResUtils;
    if(ctx.request.body&&ctx.request.body.header&&ctx.request.body.data){
        let token = ctx.request.body.header.token;
        ctx.header=ctx.request.body.header;
        ctx.data=ctx.request.body.data;
        ctx.files=ctx.request.files;
        if (ctx.url === '/api/user/login'||ctx.url==='/api/user/register') {
            //如果是登录请求，不处理，放行
            await next();
        } else if (token) {
            ctx.userInfo = await verify(token,secret);
            if (ctx.userInfo) {
                await next();
            } else {
                ctx.body=ctx.ResUtils.getFailureBody(ResCode.ERR_TOKEN,'token无效');
                return;
            }
        } else {
            ctx.body=ctx.ResUtils.getFailureBody(ResCode.ERR_TOKEN,'没有登录');
            return;
        }
    }else{
        ctx.body=ctx.ResUtils.getFailureBody(ResCode.ERR_DATA_FORMAT,'请求数据格式错误');
        return;
    }
});


//加载路由
WTRouter.loadRouter(app);


app.on('error', async (err, ctx) => {//全局异常处理,这里捕获异常，通常是为了避免服务器崩溃,记录日志。
    console.log(new Date(), ":", err);
});

app.listen(WTConfig.port, () => {
    console.log(`${package.name} is starting at port ${WTConfig.port}`);
});
