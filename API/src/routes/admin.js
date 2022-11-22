const { Router } = require("express");
const router = Router();
const { User, Course, Cart, Category, SubCategory, Order } = require("../db");

//Courses

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

router.get("/allUsers", async (req, res) => {
  try {
    let allUsers = await User.findAll({});
    res.status(200).send(allUsers);
  } catch (error) {
    res.status(400).send(error);
  }
});

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

router.get("/allOrders", async (req, res) => {
  try {
    let allOrders = await Order.findAll({});
    res.status(200).send(allOrders);
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

module.exports = router;
