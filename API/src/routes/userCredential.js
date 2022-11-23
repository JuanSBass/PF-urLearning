const { Router } = require("express");
const { where } = require("sequelize");
const router = Router();
const { User, Course } = require("../db");
const middleware = require("../middleware/index");
const admin = require("../firebase/config");

router.use(middleware.decodeToken);

router.get("/detail", async (req, res) => {
  try {
    const tokken = req.headers.authorization.split(" ")[1];
    const decodeValue = await admin.auth().verifyIdToken(tokken);
    const { user_id } = decodeValue;
    const UserS = await User.findByPk(user_id);
    console.log("es el usuario", UserS.dataValues);
    res.status(200).send(UserS.dataValues);
  } catch (error) {
    console.log(error.message);
  }
});

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
