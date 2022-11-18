require("dotenv").config();
const { Op } = require("sequelize");
const axios = require("axios");
const { Course, User, Cart } = require("../db");

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
      ID: e.ID,
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
      title: { [Op.notLike]: `%${info}%` },
      name_prof: { [Op.iLike]: `%${info}%` },
    },
  });

  return [respuesta, respuesta2].flat();
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

///////// Route Course para el carrito de compras /////////
const getCartCourseDb = async () => {
  return await Course.findAll({
    include: {
      model: User,
      attributes: ["name", "id"],
     // trought: { attributes: [] },
    },
  });
};

const getAllCart = async () => {
 
  var db = await getCartCourseDb();
  db = db.map((courses) => {
    return {
      id: courses.id,
      title: courses.title,
      image: courses.image,
      description:courses.description,
      ratingHistory:courses.ratingHistory,
      price:courses.price,
      name_prof:courses.name_prof,
     };
  });
 

  return db;
};



///////// Route Add Course ID CART /////////
//id -> courses
//ID -> User
const addCartItem = async (id, ID) => {
  const user = await User.findOne({
    where: {
      ID: ID,
    },
  });
  if (user) {
    await user.addCart(id);
    const result = await User.findOne({
      where: { ID: ID },
    });
    return await result.getCart();
  }
  return undefined;
};

///////// Route Course para el carrito de compras /////////

const getCartCourseDb = async (ID) => {
  const cartDb = ID
    ? await Cart.findAll({
        where: {
          ID: { ID },
        },
      })
    : await Cart.findAll();

  const newCartDb = await cartDb.map((e) => {
    return {
      ID: e.ID,
      title: e.title,
      image: e.image,
      description: e.description,
      price: e.price,
      name_prof: e.name_prof,
    };
  });
  console.log(newCartDb);
  return newCartDb;
};

const getAllCart = async (ID) => {
  if (ID) {
    console.log("vengo antes del getCourse");
    var db = await getCartCourseDb();
    console.log("vengo LUEGO del getCourse");
    db = db.map((courses) => {
      return {
        ID: courses.ID,
        title: courses.title,
        image: courses.image,
        description: courses.description,
        ratingHistory: courses.ratingHistory,
        price: courses.price,
        name_prof: courses.name_prof,
      };
    });
  } else {
    console.log("no se hallo el ID");
  }

  return db;
};

module.exports = {
  allInfo,
  allInfoCourses,
  getCourseById,
  changeCourseById,
  getDbInfoCourses,
  addCartItem,
  getCartCourseDb,
  getAllCart,
};
