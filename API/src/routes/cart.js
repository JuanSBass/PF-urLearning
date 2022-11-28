const { Router } = require("express");
const { getCartCourseDb, getPrueba } = require("../controllers/controllers");
const { User, Cart } = require("../db");
const router = Router();

const admin = require("../firebase/config");

////////////////////////// CART //////////////////////////
///////// Route POST Cart /////////
router.post("/", async (req, res) => {
  const { id, title, image, description, price, name_prof } = req.body[0];
  const token = req.body[1];
  const userId = await admin.auth().verifyIdToken(token);
  if (!userId) return new Error("no se pudio");

  let currentUser = await User.findByPk(userId.uid);
  let result = await currentUser.getCourses({
    attributes: ["title", "id"],
  });

  try {
    if (result.find((e) => e.id === id)) {
      res.status(404).send("elemento ya comprado");
    } else {
      let newCartItem = await Cart.findOrCreate({
        where: {
          idCourse: id,
          userId: userId.uid,
        },
        defaults: {
          idCourse: id,
          title,
          image,
          description,
          price,
          name_prof,
          userId: userId.uid,
        },
      });
      res.status(200).send(newCartItem);
    }
  } catch (error) {
    console.log(error);
    res.status(404).send(error + " error del /Post Cart");
  }
});

///////// Route GET cart /////////
router.get("/", async (req, res) => {
  try {
    const allCart = await getCartCourseDb(req);
    return allCart
      ? res.status(200).send(allCart)
      : res.status(404).send({ message: "No existe la info del carrito" });
  } catch (error) {
    console.log(error + "error del get /cart");
  }
});

///////// Route DELETE Cart ////////
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Cart.destroy({
      where: {
        ID: id,
      },
    });
    const result = await getCartCourseDb(req);
    res.status(200).send(result);
  } catch (error) {
    console.log(error + "error del delete /cart");
  }
});

///////// Route DELETE para BORRAR TODO el Cart ////////
router.delete("/", async (req, res) => {
  const clear = await getPrueba(req);

  try {
    await Cart.destroy({
      where: {
        userId: clear.uid,
      },
    });
    const result = await getCartCourseDb(req);
    res.send(200, result, "Borrado exitoso");
  } catch (error) {
    console.log(error + "error del delete /cart");
  }
});

module.exports = router;
