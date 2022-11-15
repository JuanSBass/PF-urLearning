import { useReducer } from "react";
import cartReducer, { initialState } from "../../redux/cartReducer"
import CourseItem from "../courseItem/CourseItem";

const ShoppingCart = () => {
  const [state, dispatch] = useReducer(cartReducer, initialState)
  const { products, cart } = state

  const addToCart = (id) => { 
    console.log(id)
  }
  const delFromCart = () => { }
  const clearCart = () => { }

  return (
    <div >
      <h2>Carrito de Compras</h2>
      <h3>Productos</h3>
     <article className="box grid-responsive">
        {products.map((course) => <CourseItem key={course.id} data={course} addToCart={addToCart} />)}
       </article>
      <h3>Carrito</h3>
      <article className="box"></article>
    </div>
  );
};

export default ShoppingCart;
