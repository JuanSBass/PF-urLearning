const { Router } = require("express");
const { User, Course, Cart, Category, SubCategory } = require("../db");
const {
  allInfo,
  allInfoCourses,
  getCourseById,
  changeCourseById,
  getDbInfoCourses,
  getCartCourseDb,
  getPrueba,
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
const apiPayment = require("./payment.js");
const { API_KEY_PAYMENT } = process.env;
const stripe = require("stripe")(API_KEY_PAYMENT);
const user = require("./user");
const middleware = require("../middleware");
const userCredencial = require("./userCredential");
const administrator = require("./admin.js");
const admin = require("../firebase/config");
const { card } = require("mercadopago");

router.use("/category", cat);
router.use("/api", apiPayment);
router.use("/user", user);

router.use("/admin", administrator);
router.use("/userCredential", userCredencial);

/////////////////////////////////////////  USER   ////////////////////////////////////////////////////////////
router.post("/user", async (req, res) => {
  const { email, name, id } = req.body;
  const validEmail = await validateEmail(email);
  //const validPassword = await validatePassword(password);
  console.log(email);
  console.log(name);

  try {
    if (!validEmail || email === "") {
      console.log(email);
      res.status(404).send({ message: "Email invalida o campo vacio" });
    } else {
      let newUser = await User.create({
        id,
        email,
        name,
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
    videos,
  } = req.body;

  //console.log(newCourse);
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
        videos,
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
  const { info } = req.query;
  console.log(info);
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

///////// Route DELETE para Course -> ADMIN////////

///////// Route Course by category /////////

router.get("/courseByCategory", async (req, res) => {
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

router.post("/cart", async (req, res) => {
  const { id, title, image, description, price, name_prof } = req.body[0];
  const token = req.body[1];
  const userId = await admin.auth().verifyIdToken(token);
  if (!userId) return new Error("no se pudio");

  let currentUser = await User.findByPk(userId.uid);
  let result = await currentUser.getCourses({
    attributes: ["title", "id"],
  });

  try {
    if (result.find((e) => e.id === id)) {
      console.log("ya esta comprado");
      res.status(404).send("elemento ya comprado");
    } else {
      let newCartItem = await Cart.findOrCreate({
        where: {
          idCourse: id,
          userId: userId.uid,
        },
        defaults: {
          idCourse: id,
          title,
          image,
          description,
          price,
          name_prof,
          userId: userId.uid,
        },
      });
      res.status(200).send(newCartItem);
    }
  } catch (error) {
    console.log(error);
    res.status(404).send(error + " error del /Post Cart");
  }
});

///////// Route Course para el carrito de compras /////////
router.get("/cart", async (req, res) => {
  try {
    const allCart = await getCartCourseDb(req);
    return allCart
      ? res.status(200).send(allCart)
      : res.status(404).send({ message: "No existe la info del carrito" });
  } catch (error) {
    console.log(error + "error del get /cart");
  }
});

///////// Route DELETE para el carrito de compras ////////
router.delete("/cart/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Cart.destroy({
      where: {
        ID: id,
      },
    });
    const result = await getCartCourseDb(req);
    res.status(200).send(result);
  } catch (error) {
    console.log(error + "error del delete /cart");
  }
});

///////// Route DELETE para BORRAR TODO el carrito de compras ////////
router.delete("/cart", async (req, res) => {
  const clear = await getPrueba(req);

  try {
    await Cart.destroy({
      where: {
        userId: clear.uid,
      },
    });
    const result = await getCartCourseDb(req);
    res.send(200, result, "Borrado exitoso");
  } catch (error) {
    console.log(error + "error del delete /cart");
  }
});

module.exports = router;
