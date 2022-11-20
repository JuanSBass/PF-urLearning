import React from 'react'
import { Button } from "flowbite-react"
import style from "../Pagos/PagoDenegado.module.css"

function PagoDenegado() {
    return (

        <div className={style.contenedorGeneral}>
            <div className={style.contenedorCosas}>
                <div className={style.texto}>No pudimos procesar tu pago :(</div>

                <Button
                    gradientDuoTone="purpleToBlue"
                    className={style.buttonGo} >
                    Volver al carrito
                </Button>
            </div>
        </div>
    )
}

export default PagoDenegado