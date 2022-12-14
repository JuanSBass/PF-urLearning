const e = require("express");
const { Router } = require("express");
const router = Router();
const { User, Course, FavouriteList, ProfessorRole } = require("../db");
const admin = require("../firebase/config");
const { sendMailRegister } = require("./sendemail");

router.post("/create", async (req, res) => {
  try {
    const token = req.body.authorization.split(" ")[1];
    const decodeValue = await admin.auth().verifyIdToken(token);
    console.log(decodeValue);

    const { email, user_id, picture } = decodeValue;
    const valid =
      user_id === "NMVFLA97vSh6LxcMLlbHXMwBsqJ3" ||
      user_id === "p0d0BAlDcIaJD5JYnTrMO0mofoH2" ||
      user_id === "PsPEdPVdoEX2ufdRp7tmugEZW2b2" ||
      user_id === "GiiayYyFMwckAmLJAJGMcaqBwmp1" ||
      user_id === "0Ji78Vnn0gaMUpM7m6611eO9oec2" ||
      user_id === "exw8n5E7Ljb3QDja197WSalOK2h1";

    console.log();
    let name;

    if (decodeValue.name) name = decodeValue.name;
    else {
      name = email.split("@")[0]; // El nombre del usuario será el email sin @
      // name = "Usuario";
    }

    if (!decodeValue) return new Error("no se pudio");
    let newUser = await User.findOrCreate({
      where: { id: user_id },
      defaults: {
        email,
        name,
        image: picture,
        admin: valid,
      },
    });

    if (newUser[1]) {
      sendMailRegister(name, email);
      const currentUser = await User.findByPk(user_id);
      let userName = currentUser.name;
      let newProfessorRole = await ProfessorRole.create({
        name: `Prof. ${userName}`,
      });
      await currentUser.setProfessorRole(newProfessorRole);
      let newFavoutiteList = await FavouriteList.create({
        name: `${userName}'s favourite list`,
      });
      await currentUser.setFavouriteList(newFavoutiteList);
    }

    res.status(200).send(newUser);
  } catch (errors) {
    let mensajito;
    let errorcito;
    if (errors.errors) {
      if (errors.errors[0]) {
        if (errors.errors[0].message) errorcito = errors.errors[0].message;
      }
    }

    if (errorcito === "id must be unique") {
      mensajito = "Usuario ha sido deshabilitado por Admin";
    } else {
      mensajito = errors;
    }
    res.status(404).send(mensajito);
  }
});

router.get("/getAll", async (req, res) => {
  try {
    const allUsers = await User.findAll({});
    res.status(200).send(allUsers);
  } catch (error) {
    console.log(error.message);
  }
});

// router.get("/:id", async (req, res) => {
//   const {id}
//   try {
//     const allUsers = await User.findAll({});
//     res.status(200).send(allUsers);
//   } catch (error) {
//     console.log(error.message);
//   }
// });

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { newName } = req.body;
    let response = await User.update(
      { name: newName },
      {
        where: {
          id: id,
        },
      }
    );
    res.status(200).send(response);
  } catch (error) {
    res.status(401).send(error.message);
  }
});

/**
 * Mediante la decodificacion del toquen del usuario devuelve todos los cursos que tiene
 * adquiridos mediante la relacion userCourse
 */
router.get("/allUsersWithCourses", async (req, res) => {
  const tokken = req.headers.authorization.split(" ")[1];
  const decodeValue = await admin.auth().verifyIdToken(tokken);
  const { user_id } = decodeValue;
  try {
    let allUsers = await User.findAll({
      include: Course,
      where: {
        id: user_id,
      },
    });
    res.status(200).send(allUsers);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Busca un usuario con su lista favorita e incluye los cursos asociados a su lista favo
//rita.
/**
 * Pre: Usuario registrado, crear la lista para que se le asigne al usuario automatica-
 * mente. agregar cursos a la lista.
 *
 * Post: al pegarla a la ruta develve el usuario con sus datos, los datos de la lista
 * y los titulos de los cursos que furon agregados a la lista con todos sus datos.
 */
router.get("/withFavouriteList", async (req, res) => {
  const tokken = req.headers.authorization.split(" ")[1];
  const decodeValue = await admin.auth().verifyIdToken(tokken);
  const { user_id } = decodeValue;
  try {
    let allUsers = await User.findAll({
      include: {
        model: FavouriteList,
        include: {
          model: Course,
          attributes: ["title"],
        },
      },
      where: {
        id: user_id,
      },
    });
    res.status(200).send(allUsers);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
