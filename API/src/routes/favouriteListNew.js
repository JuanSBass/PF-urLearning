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
    // console.log(error);
    res.status(404).send("el usuario ya tiene lista de favoritos");
  }
});

router.put("/addRemoveCourse", async (req, res) => {
  const { userTokken, courseId } = req.body;
  try {
    const decodeValue = await admin.auth().verifyIdToken(userTokken);
    const userId = decodeValue.uid;

    let currentUser = await User.findByPk(userId);
    let currentList = await currentUser.getFavouriteList();
    let currentCourse = await Course.findByPk(courseId);
    if (await currentList.hasCourse(currentCourse)) {
      await currentList.removeCourse(currentCourse);
    } else {
      await currentList.addCourse(currentCourse);
    }
    let finalList = await currentUser.getFavouriteList({
      include: {
        model: Course,
        attributes: ["title", "id"],
        //en el arreglo de arriba se ponen los items que se quieren mostrar
        through: {
          attributes: [],
        },
      },
    });
    res.status(200).send(finalList);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});

module.exports = router;
