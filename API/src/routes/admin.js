const { Router } = require("express");
const router = Router();
const { User, Course, Cart, Category, SubCategory, Order } = require("../db");

//Courses
//todos
router.get("/allCourses", async (req, res) => {
  try {
    let allCourses = await Course.findAll({});
    res.status(200).send(allCourses);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/deleteCourseId", async (req, res) => {
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

//Usuarios
//todos
router.get("/allUsers", async (req, res) => {
  try {
    let allUsers = await User.findAll({});
    res.status(200).send(allUsers);
  } catch (error) {
    res.status(400).send(error);
  }
});
//todos con sus cursos comprados
router.get("/allUsersWithCourses", async (req, res) => {
  try {
    let allUsers = await User.findAll({
      include: Course,
    });
    res.status(200).send(allUsers);
  } catch (error) {
    res.status(400).send(error);
  }
});

//Orders
//todas
router.get("/allOrders", async (req, res) => {
  try {
    let allOrders = await Order.findAll({});
    res.status(200).send(allOrders);
  } catch (error) {
    res.status(400).send(error);
  }
});

//filtro por estado
router.get("/allOrders/:currentStatus", async (req, res) => {
  const { currentStatus } = req.params;
  try {
    let allOrders = await Order.findAll({
      where: {
        payment_status: currentStatus,
      },
    });
    res.status(200).send(allOrders);
  } catch (error) {
    res.status(400).send(error);
  }
});

//cambio del estado
router.put("/modifyOrderStatus", async (req, res) => {
  const { order_id, payment_status } = req.body;
  try {
    let oldOrder = await Order.findByPk(order_id);
    let updatedOrder = await oldOrder.update({ payment_status });
    console.log(updatedOrder);
    res.status(200).send(updatedOrder);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/deleteOrderId", async (req, res) => {
  const { deleteOrderId } = req.body;
  console.log(deleteOrderId);
  try {
    let orderToDelete = await Order.findByPk(deleteOrderId);
    await orderToDelete.destroy();
    res.status(200).send(orderToDelete);
  } catch (error) {
    res.status(401).send(error);
  }
});

//Categories y subCategories
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

router.delete("/deleteCategorie", async (req, res) => {
  //OJO ver lo de borrado logico
  const { deleteCategorieId } = req.body;
  try {
    let categorieToDelete = await Course.findByPk(deleteCategorieId);
    await categorieToDelete.destroy();
    res.status(200).send(categorieToDelete, " destruida");
  } catch (error) {
    res.status(401).send(error);
  }
});

router.get("/allCategories", async (req, res) => {
  try {
    let allCategories = await Category.findAll({});
    res.status(200).send(allCategories);
  } catch (error) {
    console.log(error);
  }
});

router.post("/subCategory", async (req, res) => {
  let { name, categoryId } = req.body;
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

module.exports = router;
