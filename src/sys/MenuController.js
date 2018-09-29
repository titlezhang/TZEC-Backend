const menuDao = require('../common/db').MenuDao;
const ResCode = require('../common/ResCode');
const Sequelize = require('sequelize');
class MenuController {
    static async get(ctx) {
        let currentPage = ctx.data.currentPage;
        let pageSize = ctx.data.pageSize;
        let name = ctx.data.name;
        let url = ctx.data.url;
        let unitName = ctx.data.unitName;
        let where = {};
        if (name && name.length > 0) {
            where.name={[Sequelize.Op.like]:'%'+name+'%'};
        }
        if (url && url.length > 0) {
            where.url ={[Sequelize.Op.like]:'%'+url+'%'};
        }
        if (unitName && unitName.length > 0) {
            where.unitName = {[Sequelize.Op.like]:'%'+unitName+'%'};
        }
        let start = undefined;
        if (pageSize && pageSize > 0 && currentPage && currentPage > 0) {
            start = pageSize * (currentPage - 1);
        }
        let result = undefined;
        if (start!==undefined) {//分页
            result = await menuDao.findAndCountAll({
                where: where,
                limit: pageSize,
                offset: start
            });
        } else {//全部
            result = await menuDao.findAndCountAll({
                where: where
            });
        }
        ctx.body = ctx.ResUtils.getSuccessBody({
            menuInfo: result.rows,
            totalMenuCount: result.count
        });
    }

    static async delete(ctx) {
        let menuArr = ctx.data.needDeleteMenuArr;
        if (menuArr && menuArr.length > 0) {
            let idsArr = menuArr.map(menu => {
                return { id: menu.id };
            });
            let result = await menuDao.destroy({
                where: {
                    [Sequelize.Op.or]: idsArr
                }
            });
            console.log('delete:' + result + "rows menuItem!");
        }
        ctx.body = ctx.ResUtils.getSuccessBody({});
    }
    static async edit(ctx){
        let id=ctx.data.id;
        let name = ctx.data.name;
        let url = ctx.data.url;
        let unitName = ctx.data.unitName;
        let parentId=ctx.data.parentId;
        let type=ctx.data.type;
        let result=await menuDao.update({
            name: name,
            url: url,
            unitName: unitName,
            parentId:parentId,
            type:type
        },{
            where:{
                id:id
            }
        });
        if (result && result[0]> 0) {
            ctx.body = ctx.ResUtils.getSuccessBody({});
        } else {
            ctx.body = ctx.ResUtils.getFailureBody(ResCode.ERR_GENERAL, '修改失败');
        }
    }
    static async add(ctx) {
        let name = ctx.data.name;
        let url = ctx.data.url;
        let unitName = ctx.data.unitName;
        let parentId=ctx.data.parentId;
        let type=ctx.data.type;
        let result = await menuDao.create({
            name: name,
            url: url,
            unitName: unitName,
            parentId:parentId,
            type:type
        });
        if (result && result.id > 0) {
            ctx.body = ctx.ResUtils.getSuccessBody({});
        } else {
            ctx.body = ctx.ResUtils.getFailureBody(ResCode.ERR_GENERAL, '新增失败');
        }
    }

}
module.exports = MenuController;