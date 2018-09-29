const Sequelize=require('sequelize');
module.exports={
    id:{//主键id
        primaryKey:true,
        autoIncrement:true,
        type:Sequelize.BIGINT,
        allowNull:false
    },
    parentId:{
        type:Sequelize.BIGINT,
        allowNull:false
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    order:{
        type:Sequelize.INTEGER,
        allowNull:false
    }

}