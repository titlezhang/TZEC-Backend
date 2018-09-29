const UserCtr=require('./src/sys/UserController');
const MenuCtr=require('./src/sys/MenuController');
const CatagoryCtr=require('./src/pro/CatagoryController');
const Router = require('koa-router');


module.exports.loadRouter=function(app){
    let api=new Router();
    api
        //用户模块
        .post('/api/user/login',UserCtr.login)
        .post('/api/user/register',UserCtr.register)
        //菜单模块
        .post('/api/menu/get',MenuCtr.get)
        .post('/api/menu/add',MenuCtr.add)
        .post('/api/menu/delete',MenuCtr.delete)
        .post('/api/menu/edit',MenuCtr.edit)
        //类目模块
        .post('/api/catagory/get',CatagoryCtr.get)
        .post('/api/catagory/add',CatagoryCtr.add)
        .post('/api/catagory/edit',CatagoryCtr.edit)
        .post('/api/catagory/delete',CatagoryCtr.delete);
        
        
    app.use(api.routes()).use(api.allowedMethods());
};
