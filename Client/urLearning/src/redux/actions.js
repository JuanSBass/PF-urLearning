import axios from "axios";
export const GET_COURSES = "GET_COURSES";
export const POST_COURSE = "POST_COURSE";
export const POST_USER = "POST_USER";
export const GET_DETAIL = "GET_DETAIL";

export const getCourses = () => {
  try {
    return async function (dispatch) {
      const response = await axios.get("/user");
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
    return json;
  };
}

export const postUser = (payload) => {
  try {
    return async function (dispatch) {
      await axios.post("http://localhost:3001/user", payload);
      dispatch({ type: POST_USER });
    };
  } catch (error) {
    console.log(error.message);
  }
};

export const getDetail = (id) => {
  try {
    return async function (dispatch) {
      const response = await axios.get(`http://localhost:3001/course/${id}`);
      dispatch({ type: GET_DETAIL, payload: response.data });
    };
  } catch (error) {
    console.log(error.message);
  }
};
