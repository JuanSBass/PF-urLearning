import { GET_CATEGORY, GET_COURSES, POST_COURSE } from "./actions";

const initialState = {
  courses: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COURSES:
      return { ...state, courses: action.payload };

    case POST_COURSE:
      return {
        ...state,
      };

    default:
      return { ...state };
  }
}

export default rootReducer;
