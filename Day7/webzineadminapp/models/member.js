module.exports = (sequelize,DataTypes)=>{

    return sequelize.define('member',{
        email:{
            type:DataTypes.STRING(50),
            allowNull:false
        },
        userpwd:{
            type:DataTypes.STRING(100),
            allowNull:false
        },
        nickname:{
            type:DataTypes.STRING(50),
            allowNull:false
        },
        entrytype:{
            type:DataTypes.STRING(10),
            allowNull:false
        },
        snsid:{
            type:DataTypes.STRING(50),
            allowNull:true
        },
        username:{
            type:DataTypes.STRING(50),
            allowNull:true
        },
        telephone:{
            type:DataTypes.STRING(20),
            allowNull:true
        },
        photo:{
            type:DataTypes.STRING(100),
            allowNull:false
        },

        lastip:{
            type:DataTypes.STRING(20),
            allowNull:false
        },
        usertype:{
            type:DataTypes.STRING(1),
            allowNull:false
        },
        userstate:{
            type:DataTypes.STRING(1),
            allowNull:false
        }
    },{
        timestamps:true,
        paranoid:true
    });
    

};