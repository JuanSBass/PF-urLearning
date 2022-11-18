const { Router } = require("express");
const router = Router();
const { addCartItem, getCourseById } = require("../controllers/controllers");
const { User, Course, Cart } = require("../db");

// router.post("/cart", async (req, res) => {
//   const { title, image, description, price, name_prof } = req.body;

//   try {
//     console.log("tuki");
//     let newCartItem = await Cart.create({
//       title,
//       image,
//       description,
//       ratingHistory,
//       price,
//       name_prof,
//     });
//     res.status(200).send("Cart creado correctamente");
//   } catch (error) {
//     console.log("tukiiiiiiiii");
//     console.log(error);
//     res.status(404).send(error + " error del /Post Cart");
//   }
// });

// ///////// Route Course para el carrito de compras /////////
// router.get("/cart", async (req, res) => {
//   const { ID } = req.query;
//   //   const userID = ID;

//   try {
//     console.log("aaaaaaaaaaaa");
//     const allCart = await getCourseById(ID);
//     console.log(allCart, "cccccccccccccccc");
//     return allCart
//       ? res.status(200).send(allCart)
//       : res.status(404).send({ message: "No existe la info del carrito" });
//   } catch (error) {
//     console.log("bbbbbbbbbbbb");
//     console.log(error + "error del get /cart");
//   }
// });
