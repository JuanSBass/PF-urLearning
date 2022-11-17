// const { DataTypes } = require("sequelize");

// module.exports = (sequelize) => {
//   sequelize.define(
//     "cart",
//     {
//       id: {
//         type: DataTypes.UUID,
//         defaultValue: DataTypes.UUIDV4,
//         allowNull: false,
//         primaryKey: true,
//       },
//       title: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       image: {
//         type: DataTypes.TEXT,
//         allowNull: true,
//       },
    
//       description: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//       },
      
//       ratingHistory: {
//         //valor que devuelvo -> front (promediado)
//         type: DataTypes.INTEGER,
//         allowNull: true,
//         defaultValue: 0,
//       },
//       price: {
//         type: DataTypes.DECIMAL,
//         allowNull: false,
//       },
   
//       name_prof: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       // here would be the idProf reference and students
//     },
//     {
//       timestamps: false,
//       createdAt: false,
//     }
//   );
// };
