import { GET_COURSES, POST_COURSE } from "./actions";

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
		/*case GET_COURSES_BY_NAME:
			return {
				...state,
				courses: action.payload,
			};*/

    default:
      return { ...state };
  }
}

export default rootReducer;
