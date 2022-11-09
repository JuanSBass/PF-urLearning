require("dotenv").config();
const { Op } = require("sequelize");
const axios = require("axios");
const { Course, User } = require("../db");

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

  getDbUsers: async function (email) {
    //busco por email
    const userDb = email
      ? await User.findAll({
          where: {
            email: { email },
          },
        })
      : await User.findAll();

    //carga los users en la DB para guardarlos
    const newUserDb = await userDb.map((e) => {
      return {
        email: e.email,
        password: e.password,
      };
    });
    return newUserDb;
  },

  allInfo: async function (email) {
    const apiInfo = await userController.getApiUsers(email); //trae la info de la API luego de cargarse (por eso el await)
    const dbInfo = await userController.getDbUsers(email); //trae la info de la BBDD luego de cargarse (por eso el await)
    const allInfo = dbInfo.concat(apiInfo);
    return allInfo;
  },
};

module.exports = userController;
