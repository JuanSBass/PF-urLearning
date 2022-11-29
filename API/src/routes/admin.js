const { Router } = require("express");
const { where, Op } = require("sequelize");
const router = Router();
const { User, Course, Cart, Category, SubCategory, Order } = require("../db");

///////////////////Courses///////////////////
///////////////////todos///////////////////
router.get("/allCourses", async (req, res) => {
  try {
    let allCourses = await Course.findAll({
      paranoid: true,
    });
    res.status(200).send(allCourses);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/allDeletedCourses", async (req, res) => {
  try {
    let allCourses = await Course.findAll({
      paranoid: false,
    });
    let finalCourse = allCourses.filter((course) => course.deletedAt !== null);
    res.status(200).send(finalCourse);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/deleteCourseId", async (req, res) => {
  const { deleteCourseId } = req.body;
  console.log(deleteCourseId);
  try {
    let courseToDelete = await Course.findByPk(deleteCourseId);
    await courseToDelete.destroy();
    res.status(200).send("Curso eliminado");
  } catch (error) {
    res.status(401).send(error);
  }
});

///////////////////Usuarios///////////////////
///////////////////todos///////////////////
router.get("/allUsers", async (req, res) => {
  try {
    let allUsers = await User.findAll({});
    res.status(200).send(allUsers);
  } catch (error) {
    res.status(400).send(error);
  }
});
router.get("/detail", async (req, res) => {
  try {
    const id = req.headers.id;
    console.log(id);
    const UserS = await User.findByPk(id, { paranoid: false });
    console.log(UserS);
    res.status(200).send(UserS);
  } catch (error) {
    console.log(error.message);
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

router.get("/allDeletedUsers", async (req, res) => {
  try {
    let allUsers = await User.findAll({
      paranoid: false,
    });
    let finalUsers = allUsers.filter((user) => user.deletedAt !== null);
    res.status(200).send(finalUsers);
  } catch (error) {
    console.log(error);
  }
});

router.put("/restoreUser", async (req, res) => {
  const { restoreUserId } = req.body;
  //console.log(restoreCourseId);
  try {
    let userToRestore = await User.findByPk(restoreUserId, {
      paranoid: false,
    });
    await userToRestore.restore();
    res.status(200).send("Usuario restaurado");
  } catch (error) {
    res.status(401).send(error);
  }
});

router.delete("/deleteUserId", async (req, res) => {
  const id = req.headers.id;
  //console.log(deleteUserId);
  try {
    console.log(id);
    let userToDelete = await User.findByPk(id);
    await userToDelete.destroy();
    res.status(200).send("Usuario eliminado");
  } catch (error) {
    res.status(401).send(error);
  }
});

router.put("/changeUser", async (req, res) => {
  try {
    const { name, image, id } = req.body;
    console.log(name, image, id);
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

///////////////////Orders///////////////////
///////////////////todas///////////////////
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

///////////////////Categories y subCategories///////////////////
router.get("/allCategories", async (req, res) => {
  try {
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

router.get("/allDeletedCategories", async (req, res) => {
  try {
    let allCategories = await Category.findAll({
      paranoid: false,
    });
    res.status(200).send(allCategories);
  } catch (error) {
    console.log(error);
  }
});

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

router.delete("/deleteCategory", async (req, res) => {
  const { deleteCategoryId } = req.body;
  console.log(deleteCategoryId);
  try {
    let categoryToDelete = await Category.findByPk(deleteCategoryId);
    await categoryToDelete.destroy();
    res.status(200).send("Categoria Borrada");
  } catch (error) {
    res.status(401).send(error);
  }
});

router.put("/restoreCategory", async (req, res) => {
  const { restoreCategoryId } = req.body;
  //console.log(restoreCategoryId);
  try {
    let categoryToRestore = await Category.findByPk(restoreCategoryId, {
      paranoid: false,
    });
    await categoryToRestore.restore();
    res.status(200).send("Categoria restaurada");
  } catch (error) {
    res.status(401).send(error);
  }
});

router.put("/restoreCourse", async (req, res) => {
  const { restoreCourseId } = req.body;
  //console.log(restoreCourseId);
  try {
    let courseToRestore = await Course.findByPk(restoreCourseId, {
      paranoid: false,
    });
    await courseToRestore.restore();
    res.status(200).send("Curso restaurado");
  } catch (error) {
    res.status(401).send(error);
  }
});

router.put("/makeAdmin", async (req, res) => {
  const { userAdminId } = req.body;
  try {
    let userAdmin = await User.findByPk(userAdminId, {
      paranoid: false,
    });
    let usernew = await userAdmin.update({ admin: true });
    res.status(200).send("admin creado");
  } catch (error) {}
});

module.exports = router;
