import {
  GET_CATEGORY,
  GET_COURSES,
  POST_COURSE,
  GET_CHILD_CATEGORY,
  POST_USER,
  GET_DETAIL,
  FILTER_BY_CATEGORY,
  SET_CURRENT_PAGE,
} from "./actions";

const initialState = {
  courses: [],
  category: [],
  subCategories: [],
  copyCourses: [],
  course: {},
  copyCategories: [],
  currentPage: 1,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COURSES:
      return {
        ...state,
        courses: action.payload,
        copyCourses: action.payload,
      };

    case POST_USER:
      return { ...state };
    case GET_DETAIL:
      return { ...state, course: action.payload };

    case POST_COURSE:
      return {
        ...state,
      };

    case GET_CHILD_CATEGORY:
      return {
        ...state,
        subCategories: action.payload,
      };
    case GET_CATEGORY:
      return {
        ...state,
        category: action.payload,
        copyCategories: action.payload,
      };
    case FILTER_BY_CATEGORY:
      const allCategories = state.copyCategories;
      const filteredByCategories =
        action.payload === "All"
          ? allCategories
          : allCategories.filter((c) => c.name === action.payload);
      return {
        ...state,
        countries: filteredByCategories,
      };

    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    default:
      return { ...state };
  }
}

export default rootReducer;
