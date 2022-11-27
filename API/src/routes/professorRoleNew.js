const { Router } = require("express");
const router = Router();
const { User, Course, ProfessorRole } = require("../db");
// const middleware = require("../middleware");
// router.use(middleware.decodeToken);

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

//Esta acción debe llamarse al crear el curso

module.exports = router;