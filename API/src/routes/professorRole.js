const { Router } = require("express");
const router = Router();
const { User, Course, ProfessorRole } = require("../db");
const middleware = require("../middleware");
router.use(middleware.decodeToken);

/**Crear lista de favoritos:
 * PRE: el usuario debe estar creado.
 *
 * POST: Busca el usuario por su id, instancia una ProfessorRole y lo relaciona con el
 * usuario. Retorna le rol del profesor.
 */
router.post("/new", async (req, res) => {
  const { userId } = req.body;
  try {
    const currentUser = await User.findByPk(userId);

    if (await currentUser.getProfessorRole()) {
      throw new Error("el usuario ya tiene ProfessorRole");
    }
    let userName = currentUser.name;
    let newProfessorRole = await ProfessorRole.create({
      name: `Prof. ${userName}`,
    });
    await currentUser.setProfessorRole(newProfessorRole);
    let respuesta = await currentUser.getProfessorRole();
    res.status(200).send(respuesta);
  } catch (error) {
    console.log(error);
    res.status(404).send(error.message);
  }
});

/**Relaciona rol de profesor con curso:
 * PRE: el usuario debe estar creado y tener un rol de profesor asignado. El curso debe existir.
 *
 * POST: Busca el usuario por su id, busca el rol del usuario como profesor
 * , busca el curso por id y lo agrega a la lista de cursos del profesor.
 *  Retorna la lista actualizada (?).
 */
router.put("/addCourse", async (req, res) => {
  const { userId, courseId } = req.body;
  console.log(req.body, "ruta relación");
  try {
    let currentUser = await User.findByPk(userId);
    let currentProfessorRole = await currentUser.getProfessorRole();
    let currentCourse = await Course.findByPk(courseId);
    let finalList = await currentProfessorRole.addCourse(currentCourse);
    res.status(200).send("curso agregado");
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
}); //Agrega curso al profe (RapidApi) despacharse cuando el usuario crea un curso

/**Sacar curso de la lista del professorRole:
 * PRE: el usuario debe estar creado y tener un professorRole asignado.
 * El curso debe existir.
 *
 * POST: Busca el usuario por su id, busca la lista del ProfessorRole del
 * usuario, busca el curso por id y lo remueve de la lista. Retorna la lista actualizada.
 */
router.put("/removeCourse", async (req, res) => {
  const { userId, courseId } = req.body;
  try {
    let currentUser = await User.findByPk(userId);
    let currentProfessorRole = await currentUser.getProfessorRole();
    let currentCourse = await Course.findByPk(courseId);
    await currentProfessorRole.removeCourse(currentCourse);
    let finalList = await currentUser.getProfessorRole({
      include: {
        model: Course,
        attributes: ["title", "id"],
        //en el arreglo de arriba se ponen los items que se quieren mostrar
      },
    });
    res.status(200).send(finalList);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});

/**
 * Trae todas los ProfessorRoles con sus cursos asociados
 */
router.get("/all", async (req, res) => {
  try {
    let allLists = await ProfessorRole.findAll({
      include: {
        model: Course,
        attributes: ["title", "id"],
        //en el arreglo de arriba se ponen los items que se quieren mostrar
      },
    });
    res.status(200).send(allLists);
  } catch (error) {
    console.log(error);
  }
}); // Trae todos los profes

/**Traer una lista con sus cursos
 * PRE: Debe haber un usuario, con un un ProfessorRol relacionada al mismo.
 *
 * POST: Mediante su accesToken por headers retorna la info del usuario con su
 * ProefessorRole y sus cursos dictados.
 */
router.get("/fromUser", async (req, res) => {
  const { userId } = req.body;
  console.log(req.body, "fromUser");
  try {
    let currentUser = await User.findByPk(userId);
    let currentList = await currentUser.getProfessorRole({
      include: {
        model: Course,
        attributes: ["title", "id", "image", "name_prof", "rating", "price", "description"],
        //en el arreglo de arriba se ponen los items que se quieren mostrar,
      },
    });
    res.status(200).send(currentList);
  } catch (error) {
    console.log(error);
  }
}); //Muestra los cursos del profesor DEBE DESPACHARSE en el useEffect de Mi Enseñanza (icono de la Nav)

module.exports = router;

/**
 * FALTA:
 * 1. que las rutas usen el token.
 *
 */
