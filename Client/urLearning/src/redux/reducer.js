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
  LOGIN,
  LOGOUT,
} from "./actions";

const initialState = {
  courses: [],
  category: [],
  subCategories: [],
  copyCourses: [],
  course: {},
  copyCategories: [],
  currentPage: 1,
  coursesForRating: [],
  user: {},
  log: false,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COURSES:
      return {
        ...state,
        courses: action.payload,
        copyCourses: action.payload,
        coursesForRating: action.payload,
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
        currentPage: 1,
        subCategories: [],
        coursesForRating: filteredByCategories,
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
      let allCoursesSub = state.copyCourses;
      const filteredBySubCategories =
        action.payload === "All"
          ? allCoursesSub
          : allCoursesSub.filter((c) => c.subCategory === action.payload);
      return {
        ...state,
        courses: filteredBySubCategories,
        currentPage: 1,
        coursesForRating: filteredBySubCategories,
      };

    case ORDER_BY_ANY:
      let allCourses2 = state.coursesForRating;
      if (action.payload === "all") return state;
      if (action.payload === "1") {
        return {
          ...state,
          courses: allCourses2.filter((c) => c.rating === "1"),
          currentPage: 1,
        };
      } else if (action.payload === "2") {
        return {
          ...state,
          courses: allCourses2.filter((c) => c.rating === "2"),
          currentPage: 1,
        };
      } else if (action.payload === "3") {
        return {
          ...state,
          courses: allCourses2.filter((c) => c.rating === "3"),
          currentPage: 1,
        };
      } else if (action.payload === "4") {
        return {
          ...state,
          courses: allCourses2.filter((c) => c.rating === "4"),
          currentPage: 1,
        };
      } else if (action.payload === "5") {
        return {
          ...state,
          courses: allCourses2.filter((c) => c.rating === "5"),
          currentPage: 1,
        };
      } else if (action.payload === "rating+") {
        state.courses.sort((a, b) => {
          if (a.rating > b.rating) return 1;
          if (b.rating > a.rating) return -1;
          return 0;
        });
      } else if (action.payload === "rating-") {
        state.courses.sort((a, b) => {
          if (a.rating > b.rating) return -1;
          if (b.rating > a.rating) return 1;
          return 0;
        });
      } else if (action.payload === "price+") {
        state.courses.sort((a, b) => {
          if (a.price > b.price) return 1;
          if (b.price > a.price) return -1;
          return 0;
        });
      } else if (action.payload === "price-") {
        state.courses.sort((a, b) => {
          if (a.price > b.price) return -1;
          if (b.price > a.price) return 1;
          return 0;
        });
      }
    case LOGIN:
      return { ...state, user: action.payload, log: true };
    case LOGOUT:
      return { ...state, user: {}, log: false };
    default:
      return { ...state };
  }
}

export default rootReducer;
