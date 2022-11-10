import { GET_COURSES, POST_USER } from "./actions";

const initialState = {
  courses: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COURSES:
      return { ...state, courses: action.payload };
    case POST_USER:
      return { ...state };
    default:
      return { ...state };
  }
}

export default rootReducer;
