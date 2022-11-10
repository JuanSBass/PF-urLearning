require("dotenv").config();
const { Op } = require("sequelize");
const axios = require("axios");
const { Course, User } = require("../db");

/////////////////////////////////////////  USER   ////////////////////////////////////////////////////////////
const getApiUsers = async (email) => {
  try {
    let users = [];
    let urlApi = email
      ? `https://jsonplaceholder.typicode.com/users&search=${email}`
      : "https://jsonplaceholder.typicode.com/users";

    //http://localhost:3001/

    for (let i = 0; i < 1; i++) {
      const urlData = await axios.get(urlApi);
      const data = urlData.data.map(async (e) => {
        users.push({
          email: e.email,
        });
      });
      await Promise.all(data);
      urlApi = urlData.data.next;
    }
    //console.log(users);
    return users;
  } catch (error) {
    console.log(error);
    return []; //si la api no trae nada devuelve un array vacio para que no tire error
  }
};

const getDbInfo = async (email) => {
  //busco por email
  const userDb = email
    ? await User.findAll({
        where: {
          email: { email },
        },
      })
    : await User.findAll();
  //console.log(userDb);

  const newUserDb = await userDb.map((e) => {
    return {
      email: e.email,
      password: e.password,
    };
  });
  //console.log(newUserDb);
  return newUserDb;
};

const allInfo = async (email) => {
  const apiInfo = await getApiUsers(email);
  const dbInfo = await getDbInfo(email);
  const allInfo = dbInfo.concat(apiInfo);
  return allInfo;
};

/////////////////////////////////////////  COURSE  ////////////////////////////////////////////////////////////

const getDbInfoCourses = async (title) => {
  const courseDb = title
    ? await Course.findAll({
        where: {
          title: { [Op.iLike]: `%${title}%` },
        },
      })
    : await Course.findAll();
  //console.log(courseDb);

  const newCourseDb = await courseDb.map((e) => {
    return {
      id: e.id,
      title: e.title,
      image: e.image,
      category: e.category,
      subCategory: e.subcategory,
      duration: e.duration,
      description: e.description,
      language: e.language,
      price: e.price,
      rating: e.rating,
      level: e.level,
      name_prof: e.name_prof,
    };
  });
  //console.log(newCourseDb);
  return newCourseDb;
};

const allInfoCourses = async (title) => {
  const dbInfoCourses = await getDbInfoCourses(title);
  const allInfoCourses = dbInfoCourses;
  return allInfoCourses;
};

///////// Route Course ID /////////

const getCourseById = async (id) => {
  if (id.includes("-")) {
    const coursejson = await Course.findByPk(id); //convierte a json para manejarlo
    return {
      id: coursejson.id,
      title: coursejson.title,
      image: coursejson.image,
      name_prof: coursejson.name_prof,
      description: coursejson.description,
      price: coursejson.price,
      rating: coursejson.rating,
    };
  }
};

///////// Route Course Modify Rating by ID /////////

module.exports = { allInfo, allInfoCourses, getCourseById };
