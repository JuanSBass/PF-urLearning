const { DataTypes } = require("sequelize");
//aqui cuardo los cursos y su info
module.exports = (sequelize) => {
  sequelize.define(
    "cart",
    {
      ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      ratingHistory: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      name_prof: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      createdAt: false,
    }
  );
};
