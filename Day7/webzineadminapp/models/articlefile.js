module.exports = (sequelize,DataTypes)=>{

    return sequelize.define('articlefile',{
        articleid:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        filepath:{
            type:DataTypes.STRING(200),
            allowNull:false
        },
        filename:{
            type:DataTypes.STRING(200),
            allowNull:false
        }
    },{
        timestamps:true,
        paranoid:true
    });
    

};