const { Router } = require("express");
const router = Router();
const { User, Course } = require("../db");
const admin = require("../firebase/config");
const { getCourseById } = require("../controllers/controllers");

///////// Route editar para el Curso que Compras ////////

router.get("/editCourse/:id", async (req, res) => {
  const { id } = req.params;
  try {
    return res.send(await getCourseById(id));
  } catch (error) {
    res.status(400).send({ error });
  }
});

router.put("/editCourse/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, image, name_prof, description, price, duration, videos } =
      req.body;
    const newEdit = await Course.update(
      {
        title: title,
        image: image,
        name_prof: name_prof,
        description: description,
        duration: duration,
        price: price,
        videos: videos,
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.status(200).send(newEdit);
  } catch (error) {
    console.log(error);
    res.status(404).send({ error });
  }
});

module.exports = router;
