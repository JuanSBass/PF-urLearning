const { Router } = require("express");
const router = Router();
const { User, Course, Cart, Category, SubCategory } = require("../db");

router.delete("/deleteCourse", async (req, res) => {
  const { deleteCourseId } = req.body;
  console.log(deleteCourseId);
  try {
    let courseToDelete = await Course.findByPk(deleteCourseId);
    await courseToDelete.destroy();
    res.status(200).send(courseToDelete);
  } catch (error) {
    res.status(401).send(error);
  }
});

module.exports = router;
