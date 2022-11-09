const { DataTypes } = require("sequelize");
const CATEGORY = ["science", "trades", "arts"];
const SUB_CATEGORY = [
  "math",
  "chemistry",
  "welder",
  "smith",
  "visual",
  "plastic",
];
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
        type: DataTypes.TEXT,
        allowNull: true,
      },
      category: {
        type: DataTypes.ENUM(...CATEGORY),
        allowNull: false,
      },
      subCategory: {
        type: DataTypes.ENUM(...SUB_CATEGORY),
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
        type: DataTypes.DECIMAL,
        allowNull: true,
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
      // here would be the idProf reference and students
    },
    {
      timestamps: false,
      createdAt: false,
    }
  );
};
