import { GET_CATEGORY, GET_COURSES, POST_COURSE } from "./actions";

const initialState = {
  courses: [],
  category: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COURSES:
      return { ...state, courses: action.payload };

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
