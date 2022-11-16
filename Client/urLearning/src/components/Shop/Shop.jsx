import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { };


export default function Shop() {
    const dispatch = useDispatch();

    const [cart, setCart] = useState({
        cart: []
    })


    return (
        <div>
            <h1>Cesta</h1>
            <h3>Cursos</h3>
            <article className="box">
                <button>Limpiar cesta</button>
            </article>


        </div>

    )



}