const { Router } = require("express");
const { where } = require("sequelize");
const router = Router();
const { User, Course } = require("../db");

const admin = require("../firebase/config");

router.get("/detail", async (req, res) => {
  try {
    const tokken = req.headers.authorization.split(" ")[1];

    const decodeValue = await admin.auth().verifyIdToken(tokken);
    const { user_id } = decodeValue;
    const UserS = await User.findByPk(user_id);

    res.status(200).send(UserS.dataValues);
  } catch (error) {
    console.log(error.message);
  }
});

router.put("/", async (req, res) => {
  try {
    const tokken = req.body.authorization.split(" ")[1];

    const decodeValue = await admin.auth().verifyIdToken(tokken);
    const { user_id } = decodeValue;
    const id = user_id;
    const { name, image } = req.body;
    console.log(id);
    let response = await User.update(
      { name, image },
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
