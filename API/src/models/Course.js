const { DataTypes } = require("sequelize");

const LANGUAGE = ["english", "spanish"];
const LEVEL = ["easy", "medium", "advanced"];
module.exports = (sequelize) => {
  sequelize.define(
    "course",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.TEXT, //cambiar en str
        allowNull: true,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subCategory: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      language: {
        type: DataTypes.ENUM(...LANGUAGE),
        allowNull: false,
      },
      rating: {
        //-> ratingNumber
        //valor que recibo
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      ratingUserNumber: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      ratingHistory: {
        //valor que devuelvo -> front (promediado)
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      level: {
        type: DataTypes.ENUM(...LEVEL),
        allowNull: false,
      },
      name_prof: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      videos: {
        type: DataTypes.JSON,
      },
      // here would be the idProf reference and students
    },
    {
      paranoid: true,
      createdAt: false,
    }
  );
};
