const catagoryDao=require('../common/db').ProCatagoryDao;
const ResCode = require('../common/ResCode');
const Sequelize = require('sequelize');
const util=require('util');
class CatagoryController{
    static async add(ctx){
        let parentId=ctx.data.parentId;        
        let order=ctx.data.order;
        if(!util.isNumber(order)){
            order=0;
        }
        let newCata={
            parentId:parentId,
            name:ctx.data.name,
            order:order
        }       
        let result=await catagoryDao.create(newCata);
        if(result&&result.id>0){
            ctx.body=ctx.ResUtils.getSuccessBody({});
        }else{
            ctx.body=ctx.ResUtils.getFailureBody(ResCode.ERR_GENERAL,'新增失败');
        }
    }
    static async edit(ctx){
        let id=ctx.data.id;
        let parentId=ctx.data.parentId;        
        let order=ctx.data.order;
        if(!util.isNumber(order)){
            order=0;
        }
        let newCata={
            parentId:parentId,
            name:ctx.data.name,
            order:order
        }
        let result=await catagoryDao.update(newCata,{
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
    static async delete(ctx){
        let cataArr=ctx.data.needDeleteCatagoryArr;
        if(cataArr&&cataArr.length>0){
            let idsArr=cataArr.map(cataItem=>{
                return {id:cataItem.id};
            });
            let result=catagoryDao.destroy({
                where:{
                    [Sequelize.Op.or]:idsArr
                }
            });
            console.log('delete:' + result + "rows cataItem!");
        }
        ctx.body=ctx.ResUtils.getSuccessBody({});
    }
    static async get(ctx){
        let currentPage = ctx.data.currentPage;
        let pageSize = ctx.data.pageSize;
        let name=ctx.data.name;
        let level=ctx.data.level;
        let where={};
        if(name&&name.length>0){
            where.name={[Sequelize.Op.like]:'%'+name+'%'};
        }
        if(util.isNumber(level)){
            where.level={level:level};
        }
        let start = undefined;
        if (pageSize && pageSize > 0 && currentPage && currentPage > 0) {
            start = pageSize * (currentPage - 1);
        }        
        let options={
            where:where,
            order:[['level','ASC']]
        };
        
        if(start!==undefined){
            options.limit=pageSize;
            options.offset=start;
        }
        let result=await catagoryDao.findAndCountAll(options);
        ctx.body = ctx.ResUtils.getSuccessBody({
            catagoryInfo: result.rows,
            totalCount: result.count
        });
    }
}
module.exports=CatagoryController;