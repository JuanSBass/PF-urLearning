const { Router } = require("express");
const router = Router();
const { User, Course, FavouriteList } = require("../db");

/**
 * PRE: el usuario debe estar creado.
 *
 * POST: Busca el usuario por su id, instancia una FavouriteList y la relaciona con el
 * usuario. Retorna la lista (vacía).
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
 * PRE: usuario y lista previamente creados y relacionados. Curso previamente creado.
 * Recibe el id del usuario y el id del curso.
 *
 * POST: Busca la lista de favoritos de dicho usuario y relaiciona la lista al curso.
 * Retorna la lista actualizada.
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

/**
 * Falta:
 * 1. Devolver solo los cursos favoritos del usuario
 * 2. Remover un curso de la lista de favoritos (desrelacionar)
 */
