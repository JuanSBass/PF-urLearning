import React from 'react'

const CourseItem = ({ data, addToCart }) => {
    let { id, title, category, subCategory, duration, description, rating, price, name_prof } = data;
    return (
        <div style={{ border: "thin solid gray", padding: "1rem" }}>
            <h4>{title}</h4>
            <h4>${price}.00</h4>
            <button onClick={() => addToCart(id)}>Agregar al Carrito</button>
        </div>
    )
}

export default CourseItem