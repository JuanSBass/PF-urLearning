import React from 'react'
import { Button } from "flowbite-react"
import style from "../Pagos/PagoExitoso.module.css"

function PagoDenegado() {
    return (

        <div className={style.contenedorGeneral}>
            <div className={style.contenedorCosas}>
                <div className={style.texto}>¡Tu compra fue exitosa!</div>

                <div className={style.texto2}>Comienza a disfrutar</div>
                <Button
                    gradientDuoTone="purpleToBlue"
                    className={style.buttonGo} >
                    Ir a mis cursos
                </Button>
            </div>
        </div>
    )
}

export default PagoDenegado