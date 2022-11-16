import React from 'react'

const CartItem = ({ data, delFromCart }) => {
    let { id, title, price, quantity } = data
    return (
        <div style={{ borderBottom: "thin solid gray" }}>
            {console.log('soy el CartItem')}
            <h4>{title}</h4>
            <h5>${price}.00 x {quantity}</h5>
            <h5>TOTAL ${price * quantity}.00</h5> {/*  valor total de los cursos */}
            <button>Eliminar Uno</button>
            <button>Eliminar Todos</button>
        </div>
    )
}

export default CartItem