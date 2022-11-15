import axios from "axios";
////COURSES//////
export const GET_COURSES = "GET_COURSES";
export const POST_COURSE = "POST_COURSE";
export const GET_CHILD_CATEGORY = "GET_CHILD_CATEGORY";
export const GET_CATEGORY = "GET_CATEGORY";
export const POST_USER = "POST_USER";
export const GET_DETAIL = "GET_DETAIL";
export const GET_COURSES_NAME = "GET_COURSES_NAME";

///// FILTERS //////
export const FILTER_BY_CATEGORY = "FILTER_BY_CATEGORY";
export const ORDER_BY_ANY = "ORDER_BY_ANY";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const FILTER_BY_SUBCATEGORY = "FILTER_BY_SUBCATEGORY";
export const CLEAN_DETAIL = "CLEAN_DETAIL";
export const GET_SUBCATEGORIES_COURSES = "GET_SUBCATEGORIES_COURSES";

//////CARRITO///////
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_ONE_FROM_CART = "REMOVE_ONE_FROM_CART"
export const REMOVE_ALL_FROM_CART = "REMOVE_ALL_FROM_CART"
export const CLEAR_CART = "CLEAR_CART"

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

export const postUser = (payload) => {
  try {
    return async function (dispatch) {
      await axios.post("/user", payload);
      dispatch({ type: POST_USER });
    };
  } catch (error) {
    console.log(error.message);
  }
};

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
    const json = await axios.get("/category/allCategories");
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




//////////////////////CARRITO ///////////////////////


