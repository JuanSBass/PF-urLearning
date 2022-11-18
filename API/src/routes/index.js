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
const apiPayment = require("./payment.js");
const { API_KEY_PAYMENT } = process.env;
const stripe = require("stripe")(API_KEY_PAYMENT);
const user = require("./user");
const middleware = require("../middleware");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/category", cat);
router.use("/api", apiPayment);
router.use("/user", user);

/////////////////////////////////////////  USER   ////////////////////////////////////////////////////////////
router.post("/user", async (req, res) => {
  const { email, password } = req.body;

  try {
    let newUser = await User.create({
      email,
      password,
    });
    // const customer = await stripe.customers.create({
    //   email,
    // });

    res.status(200).json({ message: "Usuario creado correctamente" });
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
    videos,
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
      videos,
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
