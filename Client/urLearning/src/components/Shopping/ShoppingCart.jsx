import { useReducer } from "react";
import cartReducer, { initialState } from "../../redux/cartReducer"
import CourseItem from "../courseItem/CourseItem";
import CartItem from "../cartItem/cartItem";
import { TYPES } from "../../redux/cartActions";

const ShoppingCart = () => {
  const [state, dispatch] = useReducer(cartReducer, initialState)
  const { products, cart } = state

  const addToCart = (id) => {
    console.log(id) //numero
    dispatch({ type: TYPES.ADD_TO_CART, payload: id })
  }
  const delFromCart = (id, all = false) => { //necesita un id ||| all = true -> borra todo 
    console.log(id, all)
    if (all) {
      dispatch({ type: TYPES.REMOVE_ALL_FROM_CART, payload: id })
    } else {
      dispatch({ type: TYPES.REMOVE_ONE_FROM_CART, payload: id })
    }
  }

  const clearCart = () => {
    dispatch({ type: TYPES.CLEAR_CART })
  }


  return (
    <div >
      <h2>Carrito de Compras</h2>
      <h3>Productos</h3>
      <article className="box grid-responsive">
        {products.map((course) => <CourseItem key={course.id} data={course} addToCart={addToCart} />)}
      </article>
      <h3>Carrito</h3>
      <article className="box">
        <button onClick={clearCart}>Limpiar carrito</button>
        {cart.map((item, index) => <CartItem key={index} data={item} delFromCart={delFromCart} />)}
      </article>
    </div>
  );
};

export default ShoppingCart;
