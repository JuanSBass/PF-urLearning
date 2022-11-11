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
  let respuesta = await Course.findAll({
    where: {
      title: { [Op.iLike]: `%${title}%` },
    },
  });

  let respuesta2 = await Course.findAll({
    where: {
      name_prof: { [Op.iLike]: `%${title}%` },
    },
  });
  //console.log(respuesta);
  //console.log(respuesta2);
  return [respuesta, respuesta2];
  //aca hay que concatenar respuesta con respueta2
};

const allInfoCourses = async (title) => {
  let respuesta = await Course.findAll({});
  return respuesta;
};

///////// Route Course ID /////////

const getCourseById = async (id) => {
  if (id.includes("-")) {
    const coursejson = await Course.findByPk(id);
    return {
      id: coursejson.id,
      title: coursejson.title,
      image: coursejson.image,
      name_prof: coursejson.name_prof,
      description: coursejson.description,
      price: coursejson.price,
      rating: coursejson.rating,
      ratingUserNumber: coursejson.ratingUserNumber,
      ratingHistory: coursejson.ratingHistory,
    };
  }
};

///////// Route Course Modify Rating by ID /////////

const changeCourseById = async (id, rating) => {
  let changeRating = [];

  if (id.includes("-")) {
    //traigo por BBDD
    let currentCourse = await Course.findOne({ where: { id: id } });
    let courseRatingNumber = currentCourse.ratingUserNumber;
    //console.log(courseRatingNumber);
    await currentCourse.update({ ratingUserNumber: courseRatingNumber + 1 });
    changeRating.push(currentCourse);
    //console.log(currentCourse.ratingUserNumber);
    let ratingNew = parseInt(currentCourse.rating) + parseInt(rating);
    await currentCourse.update({ rating: ratingNew });
    //console.log(ratingNew);

    let promedio = currentCourse.rating / currentCourse.ratingUserNumber;
    //console.log(promedio);

    let change = await Course.update(
      { ratingHistory: Math.floor(promedio) },
      { where: { id } }
    );
    return change;
  }
};

module.exports = {
  allInfo,
  allInfoCourses,
  getCourseById,
  changeCourseById,
  getDbInfoCourses,
};
