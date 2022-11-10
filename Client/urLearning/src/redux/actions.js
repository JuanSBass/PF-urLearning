import axios from "axios";
export const GET_COURSES = "GET_COURSES";
export const POST_COURSE = "POST_COURSE";
export const GET_CATEGORY = "GET_CATEGORY";

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

export function getCategory() {
  return async function (dispatch) {
    const json = await axios.get("/?");
    return dispatch({
      type: GET_CATEGORY,
      payload: json.data,
    });
  };
}
