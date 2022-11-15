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
    console.log(error);
    res.status(404).send(error + "error del /Post User");
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

router.put("/:email", async (req, res) => {
  try {
    let userEmail = req.params.email;
    let { newPassword } = req.body;
    let response = await User.update(
      { password: newPassword },
      {
        where: {
          email: userEmail,
        },
      }
    );
    res.status(200).send("password modified");
  } catch (error) {
    res.status(401).send(error.message);
  }
});

module.exports = router;
