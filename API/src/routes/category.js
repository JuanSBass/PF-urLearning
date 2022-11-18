const { Router } = require("express");
const router = Router();
const { Category, SubCategory } = require("../db");
const admin = require("../firebase/config");

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

  try {
    /* const token = req.headers.authorization.split(" ")[1];
    const decodeValue = await admin.auth().verifyIdToken(token);
    console.log(decodeValue);
    if (!decodeValue) return new Error("no se pudio"); */

    let allCategories = await Category.findAll({});
    res.status(200).send(allCategories);
  } catch (error) {
    console.log(error);
  }
});

router.get("/childCategoriesFrom", async (req, res) => {
  let { categoryId } = req.query;
  try {
    let childCategories = await SubCategory.findAll({
      where: { categoryId },
    });
    res.status(200).send(childCategories);
  } catch (error) {
    console.log(error);
  }
});

router.get("/andSubcategories", async (req, res) => {
  let { id } = req.query;
  try {
    let categorySelected = await Category.findAll({
      where: { id },
    });
    let childCategories = await SubCategory.findAll({
      where: { categoryId: id },
    });
    let respuesta = [categorySelected, childCategories];
    res.status(200).send(respuesta);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
