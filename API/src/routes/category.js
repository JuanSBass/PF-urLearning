const { Router } = require("express");
const router = Router();
const { Category, SubCategory } = require("../db");

router.post("/category", async (req, res) => {
  const { name } = req.body;
  try {
    let newCategory = await Category.create({
      name,
    });

    res.status(200).send("category creado correctamente");
  } catch (error) {
    console.log(error);
    res.status(404).send("no se creo la category");
  }
});

router.post("/subCategory", async (req, res) => {
  let { name, categoryId } = req.body;
  console.log(categoryId);

  try {
    let newSubCategory = await SubCategory.create({
      name,
      categoryId,
    });

    res.status(200).send("SUBcategory creado correctamente");
  } catch (error) {
    console.log(error.message);
    res.status(404).send("no se creo la SUBcategory");
  }
});

router.get("/allCategories", async (req, res) => {
  let { categoryId } = req.body;
  console.log(categoryId);
  try {
    let allCategories = await Category.findAll({});
    res.status(200).send(allCategories);
  } catch (error) {
    console.log(error);
  }
});

router.get("/childCategoriesFrom", async (req, res) => {
  let { categoryId } = req.body;
  console.log(categoryId);
  try {
    let childCategories = await SubCategory.findAll({
      where: { categoryId },
    });
    res.status(200).send(childCategories);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
