const { Router } = require("express");
const router = Router();
const {
  User,
  Course,
  Cart,
  Category,
  SubCategory,
  Order,
  FavouriteList,
} = require("../db");

/**
 * Crea una lista de favoritos vacia y se la asigna al usuario cuyo id viene por bodu
 */
router.post("/new", async (req, res) => {
  const { userId } = req.body;
  console.log();
  try {
    let user = await User.findByPk(userId);
    let userName = user.name;
    let newFavoutiteList = await FavouriteList.create({
      name: `${userName}'s favourite list`,
    });
    user.setFavouriteList(newFavoutiteList);
    res.status(200).send(newFavoutiteList);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});

/**
 * Pasandole el id del usuario y el id del curso agrega el curso a la lista de favotiros
 * del usuario
 */
router.post("/addCourse", async (req, res) => {
  const { userId, courseId } = req.body;
  try {
    let currentUser = await User.findByPk(userId);
    let list = await currentUser.getFavouriteList();
    let currentCourse = await Course.findByPk(courseId);
    let finalList = await list.addCourse(currentCourse);
    res.status(200).send(finalList);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});

/**
 * Trae todas las listas de favoritos con sus cursos asociados
 */
router.get("/all", async (req, res) => {
  try {
    let allLists = await FavouriteList.findAll({ include: Course });
    res.status(200).send(allLists);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
