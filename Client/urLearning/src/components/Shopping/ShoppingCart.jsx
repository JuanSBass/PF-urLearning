import { useReducer } from "react";
import cartReducer, { initialState } from "../../redux/cartReducer"
import courseItem from "../../components/courseItem/courseItem"

const ShoppingCart = () => {
  const [state, dispatch] = useReducer(cartReducer, initialState)
  const { courses, cart } = state

  console.log("aaaaaaaaaaaaaaaaa");


  const addToCart = () => { }
  const delFromCart = () => { }
  const clearCart = () => { }

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
