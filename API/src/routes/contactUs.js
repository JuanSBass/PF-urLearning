const { Router } = require("express");
const { getContactUs } = require("../controllers/controllers");
const router = Router();
const { ContactUs } = require("../db");

router.post("/", async (req, res) => {
  const { email, name, message } = req.body;

  try {
    let newMessage = await ContactUs.create({
      email,
      name,
      message,
    });
    res.status(200).send(newMessage);
  } catch (error) {
    console.log(error, "error del post del contactUs");
    res.status(404).send({ error });
  }
});

router.get("/", async (req, res) => {
  const { email } = req.query;

  try {
    const allMessage = await getContactUs(email);
    return allMessage
      ? res.status(200).send(allMessage)
      : res.status(404).send("No existe el mensaje buscado");
  } catch (error) {
    console.log(error + "error del get contactUs");
  }
});

module.exports = router;
