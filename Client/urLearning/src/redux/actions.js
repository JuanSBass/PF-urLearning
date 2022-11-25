import axios from "axios";
import logOuts from "../fireBase/fuctions/logOut";
import loginUser from "../fireBase/fuctions/loginUser";
import registerUser from "../fireBase/fuctions/registerUser";
import loginWithGoogle from "../fireBase/fuctions/logGoogle";

export const GET_COURSES = "GET_COURSES";
export const POST_COURSE = "POST_COURSE";
export const GET_CHILD_CATEGORY = "GET_CHILD_CATEGORY";
export const GET_CATEGORY = "GET_CATEGORY";
export const GET_DETAIL = "GET_DETAIL";
export const FILTER_BY_CATEGORY = "FILTER_BY_CATEGORY";
export const ORDER_BY_ANY = "ORDER_BY_ANY";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const FILTER_BY_SUBCATEGORY = "FILTER_BY_SUBCATEGORY";
export const CLEAN_DETAIL = "CLEAN_DETAIL";
export const CLEAN_CATEGORIES = "CLEAN_CATEGORIES";
export const GET_SUBCATEGORIES_COURSES = "GET_SUBCATEGORIES_COURSES";
export const GET_COURSES_NAME = "GET_COURSES_NAME";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const ADD_TO_CART = "ADD_TO_CART";
export const ID_SESSION = "ID_SESSION";
export const GET_USER_DETAIL = "GET_USER_DETAIL";
export const PUT_USER = "PUT_USER";
export const GET_CART = "GET_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const CLEAR_CART = "CLEAR_CART";
export const GET_USER_COURSES = "GET_USER_COURSES";
export const GET_FAVORITE = "GET_FAVORITE";

export const getCourses = () => {
  try {
    return async function (dispatch) {
      const response = await axios.get("/course");
      dispatch({ type: GET_COURSES, payload: response.data });
    };
  } catch (error) {
    console.log(error.message);
  }
};

export function postCourse(dataCourse) {
  return async function () {
    const json = await axios.post("/course", dataCourse);
    return;
  };
}

export function getChildCategory(categoryId) {
  return async function (dispatch) {
    const json = await axios.get(
      `/category/childCategoriesFrom?categoryId=${categoryId}`
    );
    return dispatch({
      type: GET_CHILD_CATEGORY,
      payload: json.data,
    });
  };
}

export const getDetail = (id) => {
  try {
    return async function (dispatch) {
      const response = await axios.get(`/course/${id}`);
      dispatch({ type: GET_DETAIL, payload: response.data });
    };
  } catch (error) {
    console.log(error.message);
  }
};

export function getCategory() {
  return async function (dispatch) {
    const tokken = window.localStorage.getItem("tokken");
    const json = await axios.get("/category/allCategories", {
      headers: {
        Authorization: "Bearer " + tokken,
      },
    });
    return dispatch({
      type: GET_CATEGORY,
      payload: json.data,
    });
  };
}

//? <--------- Filters ------------>

export function filteredByCategories(category) {
  return {
    type: FILTER_BY_CATEGORY,
    payload: category,
  };
}

export function filteredBySubCategories(subcategory) {
  return {
    type: FILTER_BY_SUBCATEGORY,
    payload: subcategory,
  };
}
//? <--------- Orders -------->

export function orderByAny(payload) {
  return {
    type: ORDER_BY_ANY,
    payload,
  };
}

export function setCurrentPage(payload) {
  return {
    type: SET_CURRENT_PAGE,
    payload,
  };
}

export const cleanDetail = () => {
  return { type: CLEAN_DETAIL };
};

export const cleanCategory = () => {
  return { type: CLEAN_CATEGORIES };
};

export function getCoursesByname(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`/course?info=${name}`);
      return dispatch({
        type: GET_COURSES_NAME,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const getSubCategoriesName = (name) => {
  return async function (dispatch) {
    const json = await axios.get(`/courseBySubCategory?subcateg=${name}`);
    return dispatch({
      type: GET_SUBCATEGORIES_COURSES,
      payload: json.data,
    });
  };
};

export const logIn = (tokken) => {
  return async function (dispatch) {
    const oldUser = await axios.post("/user/create", {
      authorization: "Bearer " + tokken,
    });
    const semiOldUser = oldUser.data;
    dispatch({
      type: LOGIN,
      payload: {
        image: semiOldUser[0].image,
        email: semiOldUser[0].email,
        name: semiOldUser[0].name,
        admin: semiOldUser[0].admin,
      },
      //ojo que aca solo devuelve el nombre de la base de datos
      //y el resto se lo proporciona google
    });
  };
};

export const logOut = () => {
  try {
    return async (dispatch) => {
      await logOuts();
      return dispatch({
        type: LOGOUT,
      });
    };
  } catch (error) {}
};

export const startGoogleAuth = () => {
  try {
    return async (dispatch) => {
      const user = await loginWithGoogle();
      const tokken = user.accessToken;

      dispatch(logIn(tokken));
    };
  } catch (error) {
    console.log(error);
  }
};

export const registerEmailAuth = (email, password) => {
  try {
    return async (dispatch) => {
      const user = await registerUser(email, password);
      const pos = email.indexOf("@");
      const name = email.slice(0, pos);
      const token = user.accessToken;
      dispatch(logIn(token));
    };
  } catch (error) {
    console.log(error);
  }
};

export const loginEmailAuth = (email, password) => {
  try {
    return async (dispatch) => {
      const user = await loginUser(email, password);
      const tokken = user.user.accessToken;
      dispatch(logIn(tokken));
    };
  } catch (error) {
    console.log(error);
  }
};

export function addToCart(id) {
  return {
    type: ADD_TO_CART,
    payload: id,
  };
}

export function postProductCart(carrito, userTokken) {
  const item = [carrito, userTokken];
  return async function () {
    const json = await axios.post("/cart", item);
  };
}

export function updatePaymentStatus(tokken) {
  return async function () {
    const json = await axios.put("api/updateLastOrer", { tokken });
    return;
  };
}

export function clearCart() {
  try {
    // const item = userTokken;
    const tokken2 = window.localStorage.getItem("tokken");
    return async function (dispatch) {
      const json = await axios.delete(`/cart`, {
        headers: {
          Authorization: "Bearer " + tokken2,
        },
      });
      return dispatch({
        type: CLEAR_CART,
        payload: json.data,
      });
    };
  } catch (error) {
    console.log(error + "error del clearCart");
  }
}

export const getUserDetail = () => {
  try {
    return async function (dispatch) {
      const tokken = window.localStorage.getItem("tokken");
      const response = await axios.get("/userCredential/detail", {
        headers: {
          Authorization: "Bearer " + tokken,
        },
      });

      dispatch({ type: GET_USER_DETAIL, payload: response.data });
    };
  } catch (error) {
    console.log(error.message);
  }
};

export const putUser = (payload) => {
  try {
    return async function (dispatch) {
      const tokken = window.localStorage.getItem("tokken");
      const response = await axios.put("/userCredential", {
        authorization: "Bearer " + tokken,
        name: payload.name,
        image: payload.image,
      });
      console.log(tokken);
      dispatch({ type: PUT_USER });
    };
  } catch (error) {
    console.log(error.message);
  }
};

export function getCart() {
  return async function (dispatch) {
    try {
      const tokken = window.localStorage.getItem("tokken");
      const json = await axios.get("/cart", {
        headers: {
          Authorization: "Bearer " + tokken,
        },
      });
      return dispatch({
        type: GET_CART,
        payload: json.data,
      });
    } catch (error) {
      console.log({ error });
    }
  };
}

export function removeItemCart(id) {
  return async function (dispatch) {
    try {
      const tokken = window.localStorage.getItem("tokken");
      const response = await axios.delete(`/cart/${id}`, {
        headers: {
          Authorization: "Bearer " + tokken,
        },
      });
      return dispatch({
        type: REMOVE_FROM_CART,
        payload: response.data,
      });
    } catch (error) {
      console.error({ error });
    }
  };
}

export function saveCoursesAtUser(tokken, carrito) {
  return async function () {
    const json = await axios.put("api/updateUserCourseRelations", {
      tokken,
      carrito,
    });
    return;
  };
}

//? <--------- Toma los cursos comprados por el user -------->

export function getUserCourses() {
  return async function (dispatch) {
    const tokken = window.localStorage.getItem("tokken");
    const json = await axios.get("/user/allUsersWithCourses", {
      headers: {
        Authorization: "Bearer " + tokken,
      },
    });
    return dispatch({
      type: GET_USER_COURSES,
      payload: json.data,
    });
  };
}

// export const getFavorite = (id) => {
//   try {
//     return async function (dispatch) {
//       const response = await axios.get(`/favouriteList/fromUser/${id}`);
//       dispatch({ type: GET_FAVORITE, payload: response.data });
//     };
//   } catch (error) {
//     console.log(error.message);
//   }
// };

export function getFavorite() {
  return async function (dispatch) {
    const tokken = window.localStorage.getItem("tokken");
    const json = await axios.get("/favouriteList/fromUser/", {
      headers: {
        Authorization: "Bearer " + tokken,
      },
    });
    return dispatch({
      type: GET_FAVORITE,
      payload: json.data,
    });
  };
}
