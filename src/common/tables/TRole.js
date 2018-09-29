const Sequelize=require('sequelize');
module.exports={
    id:{
        primaryKey:true,
        autoIncrement:true,
        type:Sequelize.BIGINT,
        allowNull:false
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    }
}