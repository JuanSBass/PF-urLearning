const { Router } = require("express");
const router = Router();
const { User, Course } = require("../db");
const admin = require("../firebase/config");

router.post("/create", async (req, res) => {
  try {
    const token = req.body.authorization.split(" ")[1];
    const decodeValue = await admin.auth().verifyIdToken(token);
    console.log(decodeValue);

    const { email, user_id, picture } = decodeValue;
    const valid = user_id === "NMVFLA97vSh6LxcMLlbHXMwBsqJ3";
    console.log();
    let name;

    if (decodeValue.name) name = decodeValue.name;
    else {
      name = "Usuario";
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
    res.status(200).send(newUser);
  } catch (error) {
    res.status(404).send(error.message);
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
module.exports = router;
