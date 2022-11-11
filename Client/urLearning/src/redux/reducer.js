import {
  GET_CATEGORY,
  GET_COURSES,
  POST_COURSE,
  GET_CHILD_CATEGORY,
  POST_USER,
  GET_DETAIL,
  CLEAN_DETAIL,
} from "./actions";

const initialState = {
  courses: [],
  category: [],
  subCategories: [],
  copyCourses: [],
  course: {},
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
    default:
      return { ...state };
  }
}

export default rootReducer;
