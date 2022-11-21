const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
     /* fecha:{
        type:DataTypes.DATE,
        allowNull:false,
      },
      admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      }, */
      // here would be the idProf reference
    },
    
    {
      timestamps: false,
      createdAt: false,
    }
  );
};
