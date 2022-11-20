import React from 'react'
import { Button } from "flowbite-react"
import style from "../Pagos/PagoDenegado.module.css"
import { Link } from "react-router-dom";


function PagoDenegado() {
    return (

        <div className={style.contenedorGeneral}>
            <div className={style.contenedorCosas}>
                <div className={style.texto}>No pudimos procesar tu pago :(</div>
                <Link to="/shop">
                    <Button
                        gradientDuoTone="purpleToBlue"
                        className={style.buttonGo} >
                        Volver al carrito
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default PagoDenegado