const { Router } = require("express");
const { User, Course, Category, SubCategory } = require("../db");
const {
  allInfo,
  allInfoCourses,
  getCourseById,
  changeCourseById,
  getDbInfoCourses,
} = require("../controllers/controllers");
const cat = require("./category.js");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/category", cat);

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
    name_prof,
  } = req.body;

  try {
    let newCourse = await Course.create({
      title,
      image,
      category,
      subCategory,
      duration: Number(duration),
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

///////// Route Course /////////

router.get("/course", async (req, res) => {
  const { title } = req.query;
  //console.log(info);
  let allCourses;
  try {
    title
      ? (allCourses = await getDbInfoCourses(title))
      : (allCourses = await allInfoCourses(title));
    res.status(200).send(allCourses);
  } catch (error) {
    console.log(error + "error del get /course");
  }
});

///////// Route Course ID /////////

router.get("/course/:id", async (req, res) => {
  const { id } = req.params;
  try {
    return res.send(await getCourseById(id)); //envia la info (id recibida) a la funcion getById y la devuelve
  } catch (error) {
    console.log(error + "error del get /course/id");
  }
});

///////// Route Course Modify Rating by ID /////////

router.put("/course/:id", async (req, res) => {
  const { id } = req.params;
  const { rating } = req.body;
  console.log(rating);
  try {
    return res.send(await changeCourseById(id, rating));
  } catch (error) {
    console.log("error del put rating");
  }
});

///////// Route name_prof /////////

//router.get("/course")

module.exports = router;
