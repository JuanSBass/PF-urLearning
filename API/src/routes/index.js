const { Router } = require("express");
const { User, Course } = require("../db");
const { allInfo, courseController } = require("../controllers/controllers");
const { Op } = require("sequelize");
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

    res.status(200).send("Usuario creado correctamente");
  } catch (error) {
    console.log(error);
    res.status(404).send(error + "error del /Post User");
  }
});

router.get("/user", async (req, res) => {
  const { email } = req.query;

  try {
    const allUsers = await allInfo(email);
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
    if (!title) {
      const allCourses = await Course.findAll();
      return allCourses
        ? res.status(200).send(allCourses)
        : res.status(404).send("No existe el curso buscado");
    } else {
      const courses = await Course.findAll({
        where: {
          title: { [Op.iLike]: `%${title}%` },
        },
      });
      res.status(200).send(courses);
    }
  } catch (error) {
    console.log(error + "error del get /course");
  }
});

module.exports = router;
