
import { GET_CATEGORY, GET_COURSES, POST_COURSE, POST_USER, GET_DETAIL } from "./actions";

const initialState = {
  courses: [],
  category: [],
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

    case POST_COURSE:
      return {
        ...state,
      };

    case GET_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };

    default:
      return { ...state };
  }
}

export default rootReducer;
