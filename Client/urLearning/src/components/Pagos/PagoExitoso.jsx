import React, { useEffect, useState } from 'react'
import style from "../Pagos/PagoExitoso.module.css"
import { Button } from "flowbite-react"
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, saveCoursesAtUser, updatePaymentStatus } from '../../redux/actions';
import { Link, useHistory, useLocation } from "react-router-dom";



function PagoExitoso() {
    const dispatch = useDispatch()
    const [payment, setPayment] = useState([])
    const user = useSelector(state => state.user)
    const tokken = window.localStorage.getItem("tokken")
    const cart = useSelector(state => state.carrito)

    // console.log({ cart })
    useEffect(() => {
        if (cart && cart.length && !payment.length) {
            const copyCart = [...cart]
            console.log({ copyCart })
            setPayment([...copyCart])
        }
    }, [cart])

    useEffect(() => {
        dispatch(getCart())
        dispatch(updatePaymentStatus(tokken))
        dispatch(saveCoursesAtUser(tokken, cart))
        setTimeout(() => { dispatch(clearCart()) }, 3000)
    }, [dispatch, user, tokken]);

    return (
        <div className={style.contenedorGeneral}>
            <div className={style.contenedorCosas}>
                <div className={style.texto}>¡Tu compra fue exitosa!</div>
                <div className={style.contProductos}>
                    {payment.length && payment?.map((p) => {
                        return (
                            <div className={style.contItems}>
                                <img src={p.image} alt="img" className={style.images} />
                                {p.title}
                            </div>

                        )
                    })}
                </div>
                <div className={style.texto2}>Comienza a disfrutar</div>
                <Link to="/mycourses">
                    <Button
                        gradientDuoTone="purpleToBlue"
                        className={style.buttonGo}>
                        Ir a mis cursos

                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default PagoExitoso