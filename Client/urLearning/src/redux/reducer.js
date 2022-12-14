import {
  GET_CATEGORY,
  GET_COURSES,
  POST_COURSE,
  GET_CHILD_CATEGORY,
  GET_DETAIL,
  FILTER_BY_CATEGORY,
  SET_CURRENT_PAGE,
  CLEAN_DETAIL,
  CLEAN_CATEGORIES,
  FILTER_BY_SUBCATEGORY,
  ORDER_BY_ANY,
  GET_COURSES_NAME,
  GET_USER_COURSES,
  GET_FAVORITE,
  ADD_REMOVE_FAVORITE,
  GET_COMMENT,
  DELETE_COMMENT,
  /////login//////////
  LOGIN,
  LOGOUT,
  ID_SESSION,
  GET_USER_DETAIL,
  PUT_USER,
  ////////// CARRITO//////////
  ADD_TO_CART,
  GET_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  POST_MESSAGES,
  GET_MESSAGES,
  DELETE_MESSAGES,
  GET_COURSES_PROF,
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
  carrito: [],
  copyCarrito: [],
  userDetail: {},
  userCourses: [],
  messages: [],
  favorites: [],
  coursesCreated: [],
  comments: [],
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

    case CLEAN_CATEGORIES:
      return {
        ...state,
        category: [],
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
      console.log(allCourses2);
      if (action.payload === "all") return state;
      if (action.payload === "1") {
        return {
          ...state,
          courses: allCourses2.filter((c) => c.ratingHistory === 1),
          currentPage: 1,
        };
      } else if (action.payload === "2") {
        return {
          ...state,
          courses: allCourses2.filter((c) => c.ratingHistory === 2),
          currentPage: 1,
        };
      } else if (action.payload === "3") {
        return {
          ...state,
          courses: allCourses2.filter((c) => c.ratingHistory === 3),
          currentPage: 1,
        };
      } else if (action.payload === "4") {
        return {
          ...state,
          courses: allCourses2.filter((c) => c.ratingHistory === 4),
          currentPage: 1,
        };
      } else if (action.payload === "5") {
        return {
          ...state,
          courses: allCourses2.filter((c) => c.ratingHistory === 5),
          currentPage: 1,
        };
      } else if (action.payload === "rating+") {
        state.courses.sort((a, b) => {
          if (a.ratingHistory > b.ratingHistory) return 1;
          if (b.ratingHistory > a.ratingHistory) return -1;
          return 0;
        });
        return state;
      } else if (action.payload === "rating-") {
        state.courses.sort((a, b) => {
          if (a.ratingHistory > b.ratingHistory) return -1;
          if (b.ratingHistory > a.ratingHistory) return 1;
          return 0;
        });
        return state;
      } else if (action.payload === "price-") {
        state.courses.sort((a, b) => {
          if (Number(a.price) > Number(b.price)) return 1;
          if (Number(b.price) > Number(a.price)) return -1;
          return 0;
        });
        return state;
      } else if (action.payload === "price+") {
        state.courses.sort((a, b) => {
          if (Number(a.price) > Number(b.price)) return -1;
          if (Number(b.price) > Number(a.price)) return 1;
          return 0;
        });
        return state;
      }

    //////////////LOGIN //////////////////
    case LOGIN:
      return { ...state, user: action.payload, log: true };

    case LOGOUT:
      return { ...state, user: {}, log: false };

    ////////////////CARRITO/////////////
    case ADD_TO_CART:
      const cursos = state.courses;
      const product = cursos.find(
        (cursoId) => cursoId.id === action.payload.id
      );
      return {
        ...state,
        carrito: [...state.carrito, product],
      };
    case ID_SESSION:
      return { ...state, idSession: action.payload };

    case GET_CART:
      return {
        ...state,
        carrito: action.payload,
        copyCarrito: action.payload,
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        carrito: action.payload,
      };

    case CLEAR_CART:
      return {
        ...state,
        carrito: action.payload,
      };

    case GET_USER_DETAIL:
      return { ...state, userDetail: action.payload };

    case PUT_USER:
      return { ...state };

    case GET_USER_COURSES:
      return {
        ...state,
        userCourses: action.payload[0].courses,
      };

    //////////////Contact Us/////////////
    case GET_MESSAGES:
      return {
        ...state,
        messages: action.payload,
      };
    case DELETE_MESSAGES:
      return {
        ...state,
        messages: action.payload,
      };
    case GET_FAVORITE:
      return {
        ...state,
        favorites: action.payload.courses,
      };

    case ADD_REMOVE_FAVORITE:
      return {
        ...state,
        favorites: action.payload.courses,
      };

    case GET_COURSES_PROF:
      return {
        ...state,
        coursesCreated: action.payload,
      };

    case GET_COMMENT:
      return {
        ...state,
        comments: action.payload,
      };

    case DELETE_COMMENT:
      return {
        ...state,
      };

    default:
      return { ...state };
  }
}

export default rootReducer;
