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
const user = require("./user");
const userCredencial = require("./userCredential");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/category", cat);
router.use("/user", user);
router.use("/userCresential", userCredencial);

/////////////////////////////////////////  USER   ////////////////////////////////////////////////////////////

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
  const { info } = req.query;
  const tokken = req.headers;

  let allCourses;
  try {
    info
      ? (allCourses = await getDbInfoCourses(info))
      : (allCourses = await allInfoCourses(info));
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

  try {
    return res.status(200).send(await changeCourseById(id));
  } catch (error) {
    console.log("error");
  }
});

///////// Route Course by category /////////

router.get("/courseByCategory", async (req, res) => {
  console.log("hola");
  try {
    const { categ } = req.query;
    console.log(categ);
    let respuesta = await Course.findAll({
      where: {
        category: categ,
      },
    });

    return res.status(200).send(respuesta);
  } catch (error) {
    console.log("error");
  }
});

router.get("/courseBySubCategory", async (req, res) => {
  console.log("hola");
  try {
    const { subcateg } = req.query;
    console.log(subcateg);
    let respuesta = await Course.findAll({
      where: {
        subCategory: subcateg,
      },
    });

    return res.status(200).send(respuesta);
  } catch (error) {
    console.log("error");
  }
});

///////// Route name_prof /////////

//router.get("/course")

module.exports = router;
