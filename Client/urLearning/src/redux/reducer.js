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
    /*
	  case GET_COURSES_NAME:
		return{
			...state,
			courses: action.payload
		} 
	   */
    case FILTER_BY_SUBCATEGORY:
      let allCoursesSub = state.copyCourses;
      const filteredBySubCategories =
        action.payload === "All"
          ? allCoursesSub
          : allCourses.filter((c) => c.subCategory === action.payload);
      return {
        ...state,
        courses: filteredBySubCategories,
      };

    case ORDER_BY_ANY:
      if (action.payload === "all") return state;
      if (action.payload === "ratingmayor") {
        state.courses.sort((a, b) => {
          if (a.rating > b.rating) return 1;
          if (b.rating > a.rating) return -1;
          return 0;
        });
      }

    default:
      return { ...state };
  }
}

export default rootReducer;
