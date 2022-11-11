import axios from "axios";
export const GET_COURSES = "GET_COURSES";
export const POST_COURSE = "POST_COURSE";
export const GET_CHILD_CATEGORY = "GET_CHILD_CATEGORY";
export const GET_CATEGORY = "GET_CATEGORY";
export const POST_USER = "POST_USER";
export const GET_DETAIL = "GET_DETAIL";
export const FILTER_BY_CATEGORY = "FILTER_BY_CATEGORY";
export const ORDER_BY_ANY = "ORDER_BY_ANY";
export const GET_CATEGORIES = "GET_CATEGORIES";

export const getCourses = () => {
  try {
    return async function (dispatch) {
      const response = await axios.get("/course");
      console.log(response);
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

export function getCategories() {
  return async function (dispatch) {
    const response = await axios.get("/category/allCategories");
    dispatch({
      type: GET_CATEGORIES,
      payload: response.data,
    });
  };
}
//? <--------- Filters ------------>

export function filteredByCategories(category) {
  return {
    type: FILTER_BY_ACTIVITY,
    payload: category,
  };
}

//? <--------- Orders -------->

export function orderByAny(payload) {
  return {
    type: ORDER_BY_ANY,
    payload,
  };
}
