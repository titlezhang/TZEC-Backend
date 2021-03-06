const Sequelize=require('sequelize');
module.exports={
    id:{//主键id
        primaryKey:true,
        autoIncrement:true,
        type:Sequelize.BIGINT,
        allowNull:false
    },
    productId:{
        type:Sequelize.BIGINT,
        allowNull:false
    },
    specItemId:{
        type:Sequelize.BIGINT,
        allowNull:false
    },
    price:{
        type:Sequelize.FLOAT,
        allowNull:false
    },
    upc:{
        type:Sequelize.STRING,
        allowNull:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    desc:{
        type:Sequelize.STRING,
        allowNull:false
    },
    specTreeCode:{
        type:Sequelize.STRING,
        allowNull:false
    },
    stock:{
        type:Sequelize.INTEGER,
        allowNull:false
    }
}