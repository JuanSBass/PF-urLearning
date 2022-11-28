const { Router } = require("express");
const {
  getDbInfoCourses,
  allInfoCourses,
  getCourseById,
  changeCourseById,
} = require("../controllers/controllers");
const {
  validateTitle,
  validateDescription,
  validatePrice,
  validateLevel,
  validateNameProf,
} = require("../validations/validations");
const router = Router();
const { Course } = require("../db");

/////////////////////////////////////////  COURSE   ////////////////////////////////////////////////////////////
router.post("/", async (req, res) => {
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

  const validTitle = await validateTitle(title);
  const validDescription = await validateDescription(description);
  const validPrice = await validatePrice(price);
  const validLevel = await validateLevel(level);
  const validNameProf = await validateNameProf(name_prof);

  try {
    if (!validTitle || title === "") {
      res.status(404).send({ message: "Titulo invalido o inexistente" });
    } else if (category === "") {
      res.status(404).send({ message: "Categoria inexistente" });
    } else if (!validDescription || description === "") {
      res.status(404).send({ message: "Descripcion invalida o inexistente" });
    } else if (!validPrice) {
      res
        .status(404)
        .send({ message: "El precio NO debe ser menor a 0 o mayor a 100" });
    } else if (!validLevel || level === "") {
      res
        .status(404)
        .send({ message: "Nivel de dificultad invalido o inexistente" });
    } else if (!validNameProf || name_prof === "") {
      res
        .status(404)
        .send({ message: "El campo name_prof es invalido o inexistente" });
    } else {
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
      res.status(200).send("Curso creado correctamente");
    }
  } catch (error) {
    console.log(error);
    res.status(404).send(error + "error del /Post Course");
  }
});

///////// Route Course /////////
router.get("/", async (req, res) => {
  const { info } = req.query;
  const tokken = req.headers;
  console.log(info);
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

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    return res.send(await getCourseById(id)); //envia la info (id recibida) a la funcion getById y la devuelve
  } catch (error) {
    console.log(error + "error del get /course/id");
  }
});

///////// Route Course ID for Course /////////

// router.get("/course/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     return res.send(await getCourseByIdCart(id)); //envia la info (id recibida) a la funcion getById y la devuelve
//   } catch (error) {
//     console.log(error + "error del get /course/id cart");
//   }
// });

///////// Route Course Modify Rating by ID /////////

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { rating } = req.body;
  //console.log(rating);
  try {
    return res.send(await changeCourseById(id, rating));
  } catch (error) {
    console.log("error del put rating");
  }
});

///////// Route Course by category /////////

router.get("/courseByCategory", async (req, res) => {
  try {
    const { categ } = req.query;
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

///////// Route Course by subCategory /////////
router.get("/courseBySubCategory", async (req, res) => {
  try {
    const { subcateg } = req.query;
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

module.exports = router;
