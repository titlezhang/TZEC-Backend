const sequelize=require('../common/db').sequelize;
const userDao=require('../common/db').UserDao;
const roleDao=require('../common/db').RoleDao;
const menuDao=require('../common/db').MenuDao;
const ResCode=require('../common/ResCode');
const GeneralUtils=require('../common/GeneralUtils');
const SecurityUtils=require('../common/SecurityUtils');
const TokenUtil=require('../common/TokenUtil');
class UserController{
    static async register(ctx){
        //获取参数，进行校验
        let loginName=ctx.data.loginName;
        let pwd=ctx.data.pwd;
        let email=ctx.data.email;
        let mobilePhone=ctx.data.mobilePhone;
        let name=ctx.data.name;
        let user=await userDao.findOne({
            where:{
                loginName:loginName
            }
        });
        if(user){
            ctx.body=ctx.ResUtils.getFailureBody(ResCode.ERR_GENERAL,'用户已存在');
            return;
        }else{
            if(loginName&&pwd&&name){
                let pwdEncoded=SecurityUtils.createMD5SaltPwd(pwd);
                let result=await userDao.create({
                    loginName:loginName,
                    password:pwdEncoded.pwd,
                    salt:pwdEncoded.salt,
                    name:name,
                    mobilePhone:mobilePhone,
                    email:email
                });
                if(result){
                    ctx.body=ctx.ResUtils.getSuccessBody({});
                }else{
                    ctx.body=ctx.ResUtils.getFailureBody(ResCode.ERR_GENERAL,'保存失败');
                }
                return;
            }else{
                ctx.body=ctx.ResUtils.getFailureBody(ResCode.ERR_DATA_REQUIRED_MISS,'登录名、名字和密码不能为空');
                return;
            }
        }
    }
    static async login(ctx){
        //获取参数，进行校验
        let loginName=ctx.data.loginName;
        let pwd=ctx.data.password;
        
        if(loginName&&pwd){
            let user=await userDao.findOne({
                where:{
                    loginName:loginName
                }
            });
            if(user){
                pwd=SecurityUtils.encodeMD5Salt(pwd,user.salt);
                if(pwd===user.password){
                    user.password='';//把密码去掉准备返回给前端
                    let menuArr=await menuDao.findAll();
                    ctx.body=ctx.ResUtils.getSuccessBody({
                        userInfo:user,
                        menuInfo:menuArr,
                        token:TokenUtil.createToken(user)
                    });
                }else{
                    ctx.body=ctx.ResUtils.getFailureBody(ResCode.ERR_GENERAL,'用户名或者密码错误');
                }
            }else{
                ctx.body=ctx.ResUtils.getFailureBody(ResCode.ERR_GENERAL,'用户名或者密码错误');
            }
            return;
        }else{
            ctx.body=ctx.ResUtils.getFailureBody(ResCode.ERR_DATA_REQUIRED_MISS,'用户名或者密码缺失');
            return;
        }
    }
}
module.exports=UserController;