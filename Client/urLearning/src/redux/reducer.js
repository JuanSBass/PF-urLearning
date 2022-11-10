import {
  GET_CATEGORY,
  GET_COURSES,
  POST_COURSE,
  GET_CHILD_CATEGORY,
} from "./actions";

const initialState = {
  courses: [],
  category: [],
  subcategory: [],
  copyCourses: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COURSES:
      return {
        ...state,
        courses: action.payload,
        copyCourses: action.payload,
      };

    case POST_COURSE:
      return {
        ...state,
      };

    case GET_CHILD_CATEGORY:
      return {
        ...state,
        subcategory: action.payload,
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
