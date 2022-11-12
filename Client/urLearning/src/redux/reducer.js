import {
  GET_CATEGORY,
  GET_COURSES,
  POST_COURSE,
  GET_CHILD_CATEGORY,
  POST_USER,
  GET_DETAIL,
  FILTER_BY_CATEGORY,
  SET_CURRENT_PAGE,
  CLEAN_DETAIL,
  FILTER_BY_SUBCATEGORY,
  ORDER_BY_ANY,
  GET_COURSES_NAME,
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
      let allCourses = state.copyCourses;
      const filteredByCategories =
        action.payload === "All"
          ? allCourses
          : allCourses.filter((c) => c.category === action.payload);
      return {
        ...state,
        courses: filteredByCategories,
      };

    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    case CLEAN_DETAIL:
      return {
        ...state,
        course: {},
      };
    case GET_COURSES_NAME:
      return {
        ...state,
        courses: action.payload,
        currentPage: 1,
      };
    case FILTER_BY_SUBCATEGORY:
      let allCoursesSub = state.courses;
      const filteredBySubCategories =
        action.payload === "All"
          ? allCoursesSub
          : allCoursesSub.filter((c) => c.subCategory === action.payload);
      return {
        ...state,
        courses: filteredBySubCategories,
      };

    case ORDER_BY_ANY:
      if (action.payload === "all") return state;
      if (action.payload === "1") {
        return {
          ...state,
          courses: state.courses.filter((c) => c.rating === "1"),
        };
      } else if (action.payload === "2") {
        return {
          ...state,
          courses: state.courses.filter((c) => c.rating === "2"),
        };
      } else if (action.payload === "3") {
        return {
          ...state,
          courses: state.courses.filter((c) => c.rating === "3"),
        };
      } else if (action.payload === "4") {
        return {
          ...state,
          courses: state.courses.filter((c) => c.rating === "4"),
        };
      } else if (action.payload === "5") {
        return {
          ...state,
          courses: state.courses.filter((c) => c.rating === "5"),
        };
      }

    default:
      return { ...state };
  }
}

export default rootReducer;
