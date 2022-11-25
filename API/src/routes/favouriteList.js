const { Router } = require("express");
const router = Router();
const { User, Course, FavouriteList } = require("../db");
const middleware = require("../middleware");
router.use(middleware.decodeToken);

/**Crear lista de favoritos:
 * PRE: el usuario debe estar creado.
 *
 * POST: Busca el usuario por su id, instancia una FavouriteList y la relaciona con el
 * usuario. Retorna la lista (vacía).
 */
router.post("/new", async (req, res) => {
  const { userId } = req.body;
  console.log(userId);
  try {
    let user = await User.findByPk(userId);
    if (user.getFavouriteList())
      throw new Error("el usuario ya tiene lista de favs");
    let userName = user.name;
    let newFavoutiteList = await FavouriteList.create({
      name: `${userName}'s favourite list`,
    });
    user.setFavouriteList(newFavoutiteList);
    res.status(200).send(newFavoutiteList);
  } catch (error) {
    console.log(error);
    res.status(404).send(error.message);
  }
});

/**Agregar curso a la lista de favoritos:
 * PRE: el usuario debe estar creado y tener una lista asignada. El curso debe existir.
 *
 * POST: Busca el usuario por su id, busca la lista de favotitos del
 * usuario, busca el curso por id y lo agrega a la lista. Retorna la lista actualizada.
 */
router.put("/addCourse", async (req, res) => {
  const { userId, courseId } = req.body;
  try {
    let currentUser = await User.findByPk(userId);
    let currentList = await currentUser.getFavouriteList();
    let currentCourse = await Course.findByPk(courseId);
    let finalList = await currentList.addCourse(currentCourse);
    res.status(200).send(finalList);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});

/**Sacar curso de la lista de favoritos:
 * PRE: el usuario debe estar creado y tener una lista asignada. El curso debe existir.
 *
 * POST: Busca el usuario por su id, busca la lista de favotitos del
 * usuario, busca el curso por id y lo remueve de la lista. Retorna la lista actualizada.
 */
router.put("/removeCourse", async (req, res) => {
  const { userId, courseId } = req.body;
  try {
    let currentUser = await User.findByPk(userId);
    let currentList = await currentUser.getFavouriteList();
    let currentCourse = await Course.findByPk(courseId);
    await currentList.removeCourse(currentCourse);
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

/**Traer una lista con sus cursos
 * PRE: Debe haber un usuario, con un una lista de favoritos relacionada al mismo.
 *
 * POST: Mediante su id por params retorna la info del usuario con sus cursos favoritos.
 */
router.get("/fromUser", async (req, res) => {
  const { userId } = req.body;
  try {
    let currentUser = await User.findByPk(userId);
    let currentList = await currentUser.getFavouriteList({
      include: {
        model: Course,
        attributes: ["title", "id", "image", "name_prof"],
        //en el arreglo de arriba se ponen los items que se quieren mostrar
        through: {
          attributes: [],
        },
      },
    });
    res.status(200).send(currentList);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

/**
 * FALTA:
 * 1. que las rutas usen el token.
 *
 */
