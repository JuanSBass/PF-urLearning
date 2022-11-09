require("dotenv").config();
const { Op } = require("sequelize");
const axios = require("axios");
const { Course, User } = require("../db");

/////////////////////////////////////////  USER   ////////////////////////////////////////////////////////////
const userController = {
  getApiUsers: async function (email) {
    try {
      let users = [];
      let urlApi = email
        ? `https://jsonplaceholder.typicode.com/users&search=${email}`
        : "https://jsonplaceholder.typicode.com/users";

      //http://localhost:3001/

      for (let i = 0; i < 1; i++) {
        const urlData = await axios.get(urlApi); //crea una const haciendo un await de la info
        const data = urlData.data.map(async (e) => {
          //pushea la info de los juegos en games
          users.push({
            email: e.email,
          });
        });
        await Promise.all(data);
        urlApi = urlData.data.next; //le indica a la API que debe dejar de buscar
      }
      console.log(users);
      return users; //retorna los juegos
    } catch (error) {
      console.log(error);
      return []; //si la api no trae nada devuelve un array vacio para que no tire error
    }
  },

  getDbInfo: async function (email) {
    //busco por email
    const userDb = email
      ? await User.findAll({
          where: {
            email: { email },
          },
        })
      : await User.findAll();
    console.log(userDb);

    //carga los users en la DB para guardarlos
    const newUserDb = await userDb.map((e) => {
      return {
        email: e.email,
        password: e.password,
      };
    });
    console.log(newUserDb);
    return newUserDb;
  },

  allInfo: async function (email) {
    const apiInfo = await userController.getApiUsers(email); //trae la info de la API luego de cargarse (por eso el await)
    const dbInfo = await userController.getDbInfo(email); //trae la info de la BBDD luego de cargarse (por eso el await)
    const allInfo = dbInfo.concat(apiInfo);
    return allInfo;
  },
};

/////////////////////////////////////////  COURSE  ////////////////////////////////////////////////////////////
const courseController = {
  getDbInfoCourses: async function (title) {
    const courseDb = title
      ? await Course.findAll({
          where: {
            title: { title },
          },
        })
      : await Course.findAll();
    console.log(courseDb);

    const newCourseDb = await courseDb.map((e) => {
      return {
        title: e.title,
        image: e.image,
        category: e.category,
        subCategory: e.subcategory,
        duration: e.duration,
        description: e.description,
        language: e.language,
        price: e.price,
        level: e.level,
      };
    });
    console.log(newCourseDb);
    return newCourseDb;
  },

  allInfoCourses: async function (title) {
    const dbInfoCourses = await courseController.getDbInfoCourses(title);
    const allInfoCourses = dbInfoCourses;
    return allInfoCourses;
  },
};
(module.exports = userController), courseController;
