module.exports = (sequelize,DataTypes)=>{

    return sequelize.define('article',{
        title:{
            type:DataTypes.STRING(100),
            allowNull:false
        },
        boardid:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        contents:{
            type:DataTypes.TEXT,
            allowNull:true
        },
        viewcount:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        ipaddress:{
            type:DataTypes.STRING(20),
            allowNull:false
        },
        displayyn:{
            type:DataTypes.BOOLEAN,
            allowNull:false
        },
        createduid:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        updateduid:{
            type:DataTypes.INTEGER,
            allowNull:false
        }
    },{
        timestamps:true,
        paranoid:true
    });
    

};