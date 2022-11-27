const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "professorRole",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      paranoid: true,
      createdAt: false,
    }
  );
};

//1:1 con usuario falta
