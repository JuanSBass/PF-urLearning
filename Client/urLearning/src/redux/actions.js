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

export const logIn = (uid, email, name, photo) => {
  const newUser = {
    id: uid,
    email: email,
    name: name,
  };

  return async function (dispatch) {
    const oldUser = await axios.post("/user/create", newUser);
    const semiOldUser = oldUser.data;
    dispatch({
      type: LOGIN,
      payload: { uid, email, name: name, photo },
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

      dispatch(
        logIn(
          user.user.uid,
          user.user.email,
          user.user.name,
          user.user.photoURL
        )
      );
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

      dispatch(logIn(user.user.uid, user.user.email, name));
    };
  } catch (error) {
    console.log(error);
  }
};

export const loginEmailAuth = (email, password) => {
  try {
    return async (dispatch) => {
      const user = await loginUser(email, password);
      const jsonUser = {
        id: user.user.uid,
      };
      const oldUser = await axios.post("/user/create", jsonUser);
      const semiOldUser = oldUser.data;
      dispatch(
        logIn(semiOldUser[0].uid, semiOldUser[0].name, semiOldUser[0].email)
      );
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

export function postProductCart(carrito) {
  return async function () {
    const json = await axios.post("/cart", carrito);
    return;
  };
}
