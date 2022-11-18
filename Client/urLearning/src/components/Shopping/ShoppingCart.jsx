import { useReducer } from "react";
import {useDispatch} from "react-redux";
import cartReducer, { initialState } from "../../redux/cartReducer"
import courseItem from "../../components/courseItem/courseItem"
import CartItem from "../cartItem/cartItem";
import { useDispatch, useSelector } from "react-redux";
import { delFromCart, clearCart } from '../../redux/cartActions'
import { addToCart } from "../../redux/actions";

const ShoppingCart = () => {
  //const [state, dispatch] = useReducer(cartReducer, initialState)
  const dispatch = useDispatch()
  const state = useSelector(state => state)
  const { products, cart } = state.shopping
  console.log(state)
  console.log(state.products)

  // const addToCart = (id) => {
  //   console.log(id) //numero
  //   dispatch({ type: ADD_TO_CART, payload: id })
  // }

  // const delFromCart = (id, all = false) => { //necesita un id ||| all = true -> borra todo 
  //   console.log(id, all)
  //   if (all) {
  //     dispatch({ type: TYPES.REMOVE_ALL_FROM_CART, payload: id })
  //   } else {
  //     dispatch({ type: TYPES.REMOVE_ONE_FROM_CART, payload: id })
  //   }
  // }

  // const clearCart = () => {
  //   dispatch({ type: TYPES.CLEAR_CART })
  // }


  return (
    <div>
      <h2>carrito de cursos</h2>
      {console.log('soy el carrito de compras')}
      <article className="box">
        {courses.map((course) => <courseItem key={course.id} data={course} addToCart={addToCart} />)}
        {console.log(courses)}
      </article>
      <h3>Carrito</h3>
    </div>
  );
};

export default ShoppingCart;
