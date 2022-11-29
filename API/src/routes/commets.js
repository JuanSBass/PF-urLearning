const { Router } = require("express");
const {
  getCommentCourseDb,
  getCommentById,
} = require("../controllers/controllers");
const router = Router();
const { Comments } = require("../db");
const admin = require("../firebase/config.js");

/////////////// POST a comment /////////////////

router.post("/", async (req, res) => {
  const { id, comment } = req.body;
  const tokken = req.body.headers.authorization.split(" ")[1];
  const userId = await admin.auth().verifyIdToken(tokken);
  if (!userId) return new Error("no se pudio");
  try {
    let newComment = await Comments.create({
      idCourse: id,
      comment,
      userId: userId.uid,
    });
    res.status(200).send(newComment);
  } catch (error) {
    console.log(error);
    res.status(404).send(error + " error del /Post Comment");
  }
});

///////// Route Comment GET /////////
router.get("/", async (req, res) => {
  try {
    const allComments = await getCommentCourseDb(req);
    return allComments
      ? res.status(200).send(allComments)
      : res.status(404).send({ message: "No existen comentarios" });
  } catch (error) {
    console.log(error + "error del get comment");
  }
});

///////// Route Comment DELETE /////////
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    Comments.destroy({
      where: {
        ID: id,
      },
    });
    res.send("Comentario borrada");
  } catch (error) {
    console.log(error);
  }
});

///////// Route Comment PUT /////////
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const com = req.body;
  try {
    if (id) {
      const comChange = await Comments.update(com, {
        where: {
          ID: id,
        },
      });
    }
    res.send("Cambio efectuado!");
  } catch (error) {
    console.log(error);
  }
});

///////// Route Comment ID /////////
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    return res.send(await getCommentById(id)); //envia la info (id recibida) a la funcion getById y la devuelve
  } catch (error) {
    console.log(error + "error del get comment /id");
  }
});

module.exports = router;
