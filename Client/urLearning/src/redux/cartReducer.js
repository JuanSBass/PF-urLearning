import { TYPES } from "./cartActions";
import { GET_COURSES } from "./actions";
export const initialState = {
  cart: [],
  products: [],
  courses: [],
  course: {},
  copyCourses: [],
  coursesForRating: [],
};

function cartReducer(state = initialState, action) {
  {
    console.log("aaaaaaaaaaaaaaaaa");
  }
  switch (action.type) {
    case GET_COURSES:
      return {
        ...state,
        courses: action.payload,
        copyCourses: action.payload,
        coursesForRating: action.payload,
      };
    case TYPES.ADD_TO_CART:
      return {
        ...state,
        cart: action.payload,
      };

    case TYPES.REMOVE_ONE_FROM_CART:
      return {
        ...state,
        cart: action.payload,
      };

    case TYPES.REMOVE_ALL_FROM_CART:
      return {
        ...state,
        cart: action.payload,
      };

    case TYPES.CLEAR_CART:
      return {
        ...state,
        cart: action.payload,
      };

    default:
      return { ...state };
  }
}

export default cartReducer;
