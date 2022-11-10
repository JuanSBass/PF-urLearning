import axios from "axios";
export const GET_COURSES = "GET_COURSES";
export const POST_USER = "POST_USER";

export const getCourses = () => {
  try {
    return async function (dispatch) {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      console.log(response);
      dispatch({ type: GET_COURSES, payload: response.data });
    };
  } catch (error) {
    console.log(error.message);
  }
};

export const postUser = (payload) => {
  try {
    return async function (dispatch) {
      await axios.post("http://localhost:3000//user", payload);
      dispatch({ type: POST_USER });
    };
  } catch (error) {
    console.log(error.message);
  }
};
