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

      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        default: false,
      },
    },
    {
      paranoid: true,
      createdAt: false,
    }
  );
  // here would be the idProf reference
};
