const Sequelize=require('sequelize');
module.exports={
    id:{
        primaryKey:true,
        autoIncrement:true,
        type:Sequelize.BIGINT,
        allowNull:false
    },
    loginName:{
        type:Sequelize.STRING,
        allowNull:false
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    },
    salt:{
        type:Sequelize.STRING,
        allowNull:false
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    mobilePhone:{
        type:Sequelize.STRING,
        allowNull:true
    },
    email:{
        type:Sequelize.STRING,
        allowNull:true
    },
    roleId:{
        type:Sequelize.BIGINT,
        allowNull:true
    }

}