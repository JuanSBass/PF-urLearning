import {
  ADD_TO_CART,
  REMOVE_ONE_FROM_CART,
  REMOVE_ALL_FROM_CART,
  CLEAR_CART,
} from "./types";

export const initialState = {
  cart: [],
  products: [{ id: "1", title: "cocina", price: 100 }],
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
  switch (action.type) {
    case ADD_TO_CART: {
      //buscar el id en products y guardar en una variable
      let newItem = state.products.find(
        (product) => product.id === action.payload
      ); //cuando el id coincida almacenas el obj
      console.log(newItem);

      //reviar si el id de producto existe -> si es asi hago una modificacion
      let itemInCart = state.cart.find((item) => item.id === newItem.id); //aqui se guardan los id de los products que esten SOLO en el carrito

      //si el item no esta en el cart le genera el quantity
      //pero si esta en el cart le suma 1 a esa propiedad
      return itemInCart
        ? {
            ...state,
            cart: state.cart.map((item) =>
              item.id === newItem.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          }
        : { ...state, cart: [...state.cart, { ...newItem, quantity: 1 }] }; //quantity: 1 -> siginifica que es el primer item de ese producto
    }

    case REMOVE_ONE_FROM_CART: {
      let itemToDelete = state.cart.find((item) => item.id === action.payload);

      //debes evitar que quantity sera MENOR a 0
      //si llega a cero lo borra del carrito
      return itemToDelete.quantity > 1
        ? {
            ...state,
            cart: state.cart.map((item) =>
              item.id === action.payload
                ? { ...item, quantity: item.quantity - 1 }
                : item
            ),
          }
        : {
            ...state,
            cart: state.cart.filter((item) => item.id !== action.payload), //elimina el item del array cart
          };
    }

    case REMOVE_ALL_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };

    case CLEAR_CART:
      //console.log(initialState);
      return initialState; //devuelve todo vacio

    default:
      return initialState;
  }
}

export default cartReducer;
