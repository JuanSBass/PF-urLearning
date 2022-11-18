const { Router } = require("express");
const router = Router();
const { addCartItem, getCourseById } = require("../controllers/controllers");
const { User, Course, Cart } = require("../db");
