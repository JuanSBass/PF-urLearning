const { Router } = require("express");
const router = Router();
const { User, Course, FavouriteList } = require("../db");
const admin = require("../firebase/config.js");

/**Crear lista de favoritos:
 * PRE: el usuario debe estar creado.
 *
 * POST: Busca el usuario por su id, instancia una FavouriteList y la relaciona con el
 * usuario. Retorna la lista (vacía).
 */
router.post("/new", async (req, res) => {
  const { userTokken } = req.body;

  try {
    const decodeValue = await admin.auth().verifyIdToken(userTokken);
    const userId = decodeValue.uid;

    const currentUser = await User.findByPk(userId);
    if (await currentUser.getFavouriteList())
      throw new Error("el usuario ya tiene lista de favs");
    let userName = currentUser.name;
    let newFavoutiteList = await FavouriteList.create({
      name: `${userName}'s favourite list`,
    });
    currentUser.setFavouriteList(newFavoutiteList);
    res.status(200).send(newFavoutiteList);
  } catch (error) {
    console.log(error);
    res.status(404).send(error.message);
  }
});

module.exports = router;
