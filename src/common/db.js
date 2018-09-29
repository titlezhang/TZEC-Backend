const Sequelize=require('sequelize');
const TUser=require('./tables/TUser');
const TRole=require('./tables/TRole');
const TMenu=require('./tables/TMenu');
const TPro=require('./tables/TPro');
const TProCatagory=require('./tables/TProCatagory');
const TProPic=require('./tables/TProPic');
const TProSpec=require('./tables/TProSpec');
const TProSpecItem=require('./tables/TProSpecItem');
const TProSpecSubItem=require('./tables/TProSpecSubItem');
const sequelize=new Sequelize('wt','root','123456',{
    host:'127.0.0.1',
    dialect:'mysql',
    operatorsAliases:false,
    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    }
});
sequelize.authenticate().then(()=>{
    console.log('Connection has been established successfully.');
}).catch(err=>{
    console.error('Unable to connect to the database:',err);
});
//向sequelize定义表
const User=sequelize.define('wt_sys_user',TUser);
const Role=sequelize.define('wt_sys_role',TRole);
const Menu=sequelize.define('wt_sys_menu',TMenu);
const Pro=sequelize.define('wt_pro',TPro);
const ProCatagory=sequelize.define('wt_pro_catagory',TProCatagory);
const ProPic=sequelize.define('wt_pro_pic',TProPic);
const ProSpec=sequelize.define('wt_pro_spec',TProSpec);
const ProSpecItem=sequelize.define('wt_pro_spec_item',TProSpecItem);
const ProSpecSubItem=sequelize.define('wt_pro_spec_sub_item',TProSpecSubItem);
//创建表
User.sync();
Role.sync();
Menu.sync();
Pro.sync();
ProCatagory.sync();
ProPic.sync();
ProSpec.sync();
ProSpecItem.sync();
ProSpecSubItem.sync();
module.exports.sequelize=sequelize;
module.exports.UserDao=User;
module.exports.RoleDao=Role;
module.exports.MenuDao=Menu;
module.exports.ProDao=Pro;
module.exports.ProCatagoryDao=ProCatagory;
module.exports.ProPicDao=ProPic;
module.exports.ProSpecDao=ProSpec;
module.exports.ProSpecItemDao=ProSpecItem;
module.exports.ProSpecSubItemDao=ProSpecSubItem;


