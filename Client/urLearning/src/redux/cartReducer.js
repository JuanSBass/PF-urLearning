import { TYPES } from "./cartActions";
import { GET_COURSES } from "./actions";
export const initialState = {
  cart: [],
  products: [
    {id:1,title:"Curso 1",price:100},
    // {id:2,title:"Curso 2",price:200},
    // {id:3,title:"Curso 3",price:300},
    // {id:4,title:"Curso 4",price:400},
    // {id:5,title:"Curso 5",price:500},
    // {id:6,title:"Curso 6",price:600},
  
    ],
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
