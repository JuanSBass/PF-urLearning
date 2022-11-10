import { GET_COURSES, GET_DETAIL, POST_USER } from "./actions";

const initialState = {
  courses: [],
  course: {},
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COURSES:
      return { ...state, courses: action.payload };
    case POST_USER:
      return { ...state };
    case GET_DETAIL:
      return { ...state, course: action.payload };
    default:
      return { ...state };
  }
}

export default rootReducer;
