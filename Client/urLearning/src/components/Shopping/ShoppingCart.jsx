import CourseItem from "../courseItem/CourseItem";
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
    <div >
      <h2>Carrito de Compras</h2>
      <h3>Productos</h3>
      <article className="box grid-responsive">
        {products?.map((course) => <CourseItem key={course.id} data={course} addToCart={() => dispatch(addToCart(products.id))} />)}
      </article>
      <h3>Carrito</h3>
      <article className="box">
        <button onClick={() => dispatch(clearCart())}>Limpiar carrito</button>
        {cart?.map((item, index) => <CartItem key={index} data={item} delOneFromCart={() => dispatch(delFromCart(item.id))} delAllFromCart={() => dispatch(delFromCart(item.id, true))} />)}
      </article>
    </div>
  );
};

export default ShoppingCart;
