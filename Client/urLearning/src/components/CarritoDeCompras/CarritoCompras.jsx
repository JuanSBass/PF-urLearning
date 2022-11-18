import React from 'react'
import { useSelector } from 'react-redux'

const CarritoCompras = () => {
    const carrito = useSelector()
    return (
        <div>CarritoCompras</div>
    )
}

export default CarritoCompras