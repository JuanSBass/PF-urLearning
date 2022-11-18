const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "order",
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      amount_subtotal: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      customer_email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      payment_status: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
};
