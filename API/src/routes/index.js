const { Router } = require("express");
const { User, Course } = require("../db");
const {
  allInfo,
  allInfoCourses,
  getCourseById,
} = require("../controllers/controllers");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

/////////////////////////////////////////  USER   ////////////////////////////////////////////////////////////
router.post("/user", async (req, res) => {
  const { email, password } = req.body;

  try {
    let newUser = await User.create({
      email,
      password,
    });
    //console.log(newUser);

    res.status(200).send("Usuario creado correctamente");
  } catch (error) {
    console.log(error);
    res.status(404).send(error + "error del /Post User");
  }
});

router.get("/", async (req, res) => {
  const { email } = req.query;

  try {
    const allUsers = await allInfo(email);
    //console.log(allUsers);
    return allUsers
      ? res.status(200).send(allUsers)
      : res.status(404).send("No existe el usuario buscado");
  } catch (error) {
    console.log(error + "error del get /user");
  }
});

/////////////////////////////////////////  COURSE   ////////////////////////////////////////////////////////////
router.post("/course", async (req, res) => {
  const {
    title,
    image,
    category,
    subCategory,
    duration,
    description,
    language,
    price,
    level,
    name_prof,
  } = req.body;

  try {
    let newCourse = await Course.create({
      title,
      image,
      category,
      subCategory,
      duration,
      description,
      language,
      price,
      level,
      name_prof,
    });
    //console.log(newCourse);

    res.status(200).send("Curso creado correctamente");
  } catch (error) {
    console.log(error);
    res.status(404).send(error + "error del /Post Course");
  }
});

router.get("/course", async (req, res) => {
  const { title } = req.query;
  try {
    const allCourses = await allInfoCourses(title);
    //console.log(allCourses);
    return allCourses
      ? res.status(200).send(allCourses)
      : res.status(404).send("No existe el curso buscado");
  } catch (error) {
    console.log(error + "error del get /course");
  }
});

router.get("/course/:id", async (req, res) => {
  const { id } = req.params;
  try {
    return res.send(await getCourseById(id)); //envia la info (id recibida) a la funcion getById y la devuelve
  } catch (error) {
    console.log(error + "error del get /course/id");
  }
});

module.exports = router;
