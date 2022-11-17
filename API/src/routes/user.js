const { Router } = require("express");
const { where } = require("sequelize");
const router = Router();
const { User, Course } = require("../db");

router.post("/create", async (req, res) => {
  const { id, email, name } = req.body;
  try {
    let newUser = await User.findOrCreate({
      where: { id: id },
      defaults: {
        email,
        name,
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

module.exports = router;
