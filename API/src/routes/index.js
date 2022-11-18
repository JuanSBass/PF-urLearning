const { Router } = require("express");
const { User, Course, Cart, Category, SubCategory } = require("../db");
const {
  allInfo,
  allInfoCourses,
  getCourseById,
  changeCourseById,
  getDbInfoCourses,
  getAllCart,
} = require("../controllers/controllers");
const {
  validateEmail,
  validatePassword,
  validateTitle,
  validateDescription,
  validatePrice,
  validateLevel,
  validateNameProf,
} = require("../validations/validations");
const router = Router();
const cat = require("./category.js");
router.use("/category", cat);

/////////////////////////////////////////  USER   ////////////////////////////////////////////////////////////
router.post("/user", async (req, res) => {
  const { email, password } = req.body;
  const validEmail = await validateEmail(email);
  const validPassword = await validatePassword(password);

  try {
    if (!validEmail || email === "") {
      res.status(404).send({ message: "Email invalida o campo vacio" });
    } else if (!validPassword || password === "") {
      res.status(404).send({ message: "Password invalida o campo vacio" });
    } else {
      let newUser = await User.create({
        email,
        password,
      });
      res.status(200).send("Usuario creado correctamente");
    }
  } catch (error) {
    console.log(error);
    res.status(404).send(error + " error del /Post User");
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

  const validTitle = await validateTitle(title);
  const validDescription = await validateDescription(description);
  const validPrice = await validatePrice(price);
  const validLevel = await validateLevel(level);
  const validNameProf = await validateNameProf(name_prof);

  try {
    console.log(description.length);
    console.log(validTitle);
    console.log(level);
    //console.log(price.length, "dddddd");
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
      });
      //console.log(newCourse);
      res.status(200).send("Curso creado correctamente");
    }
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

///////// Route Course ID for Cart /////////

router.get("/course/:id", async (req, res) => {
  const { id } = req.params;
  try {
    return res.send(await getCourseByIdCart(id)); //envia la info (id recibida) a la funcion getById y la devuelve
  } catch (error) {
    console.log(error + "error del get /course/id cart");
  }
});

///////// Route Course Modify Rating by ID /////////

router.put("/course/:id", async (req, res) => {
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

///////////////////////// Cart /////////////////////////

router.post("/cart", async (req, res) => {
  const { title, image, description, price, name_prof } = req.body;

  try {
    console.log("tuki");
    let newCartItem = await Cart.create({
      title,
      image,
      description,
      price,
      name_prof,
    });
    res.status(200).send("Cart creado correctamente");
  } catch (error) {
    console.log("tukiiiiiiiii");
    console.log(error);
    res.status(404).send(error + " error del /Post Cart");
  }
});

router.get("/cart/:ID", async (req, res) => {
  const { ID } = req.params;

  try {
    console.log("aaaaaaaaaaaa");
    const allCart = await getAllCart(ID);
    console.log(allCart);
    return allCart
      ? res.status(200).send(allCart)
      : res.status(404).send({ message: "No existe la info del carrito" });
  } catch (error) {
    console.log("bbbbbbbbbbbb");
    console.log(error + "error del get /cart");
  }
});

///////// Route name_prof /////////

//router.get("/course")

module.exports = router;
