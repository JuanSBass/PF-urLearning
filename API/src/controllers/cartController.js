// require("dotenv").config();
// const { Op } = require("sequelize");
// const axios = require("axios");
// const { Course, User,Cart} = require("../db");



// let cartModel = {
//     getCartItem: async function (ID) {
//       const user = await User.findOne({
//         where: { ID },
//       });
//       return await user.getCart();
//     },
  
//     addCartItem: async function (bookID, userID) {
//       const user = await User.findOne({
//         where: {
//           ID: userID,
//         },
//       });
//       if (user) {
//         await user.addCart(bookID);
//         const result = await Users.findOne({
//           where: { ID: userID },
//         });
//         return await result.getCart();
//       }
//       return undefined;
//     },
//     deleteCartItem: async function (bookID, userID) {
//       try {
//         let user = await Users.findByPk(userID);
//         if (user === null) {
//           return null;
//         }
//         const items = await user.removeCart(bookID);
//         if (items === 0) return items;
//         user = await Users.findByPk(userID);
//         return await user.getCart();
//       } catch (error) {
//         return null;
//       }
//     },
  
//     deleteCart: async function (userID) {
//       const user = await Users.findByPk(userID, { include: 'cart' });
//       if (user) {
//         await user.setCart([]);
//         return true;
//       }
//       return false;
//     },
//   };

  
// module.exports = cartModel;


