const { Router } = require("express");
const router = Router();
const cat = require("./category.js");
const apiPayment = require("./payment.js");
const user = require("./user");
const userCredencial = require("./userCredential");
const administrator = require("./admin.js");
const favouriteList = require("./favouriteList.js");
const edit = require("./edit.js");
const contactUs = require("./contactUs.js");
const comments = require("./commets.js");
const cart = require("./cart.js");
const course = require("./course.js");

router.use("/category", cat);
router.use("/api", apiPayment);
router.use("/user", user);
router.use("/admin", administrator);
router.use("/userCredential", userCredencial);
router.use("/favouriteList", favouriteList);
router.use("/edit", edit);
router.use("/contactUs", contactUs);
router.use("/comment", comments);
router.use("/cart", cart);
router.use("/course", course);

module.exports = router;
