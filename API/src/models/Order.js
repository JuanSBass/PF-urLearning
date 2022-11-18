const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "order",
    {
      external_reference: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      status: {
        type: DataTypes.ENUM("created", "processing", "cancelled", "complete"),
        allowNull: true,
      },
      payment_id: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      payment_status: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      merchant_order_id: {
        type: DataTypes.BIGINT,
        defaultValue: 0,
      },
    },
    {
      timestamps: false,
    }
  );
};
