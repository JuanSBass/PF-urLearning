import React, { useEffect } from 'react'
import style from "../Pagos/PagoExitoso.module.css"
import { Button } from "flowbite-react"
import { useDispatch, useSelector } from "react-redux";
import { getCart, updatePaymentStatus } from '../../redux/actions';



function PagoExitoso() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const tokken = window.localStorage.getItem("tokken")
    const cart = useSelector(state => state.carrito)
    console.log(cart);
    useEffect(() => {
        console.log(user);
        console.log(tokken);
        dispatch(updatePaymentStatus(tokken))
        dispatch(getCart())

    }, [dispatch, user, tokken]);

    return (
        <div className={style.contenedorGeneral}>
            <div className={style.contenedorCosas}>
                <div className={style.texto}>¡Tu compra fue exitosa!</div>
                <div className={style.contProductos}>
                    {cart.map((p) => {
                        return (
                            <div className={style.contItems}>
                                <img src={p.image} alt="img" className={style.images} />
                                {p.title}
                            </div>

                        )
                    })}
                </div>
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

export default PagoExitoso