import React, { useEffect } from 'react'
import style from "../Pagos/PagoExitoso.module.css"
import { Button } from "flowbite-react"
import { saveDataSession } from '../../redux/actions';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";




function PagoExitoso() {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const sessionId = useSelector(state => state.idSession)


    useEffect(() => {
        // const ids = [sessionId, user.id]
        dispatch(saveDataSession(user.id, sessionId))
        console.log(user.id)
    }, [dispatch]);

    const products = [
        {
            id: 1,
            name: "Curso de Marco",
            quantity: 1,
            price: 5000,
            image: "https://picaro.news/wp-content/uploads/2022/04/mate.jpg"
        },
        {
            id: 2,
            name: "Aprende guitarra",
            quantity: 1,
            price: 4000,
            image: "https://www.superprof.com.ar/blog/wp-content/uploads/2020/03/aprender-guitarra-principiante-1060x704.jpg"
        },
        {
            id: 3,
            name: "Filosofando entre mates",
            quantity: 1,
            price: 5000,
            image: "https://images.ecestaticos.com/eJpF9C7qs7nMMSPadj5u1uQeukQ=/131x0:863x548/1200x900/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2Ffa6%2Ff7f%2Fe35%2Ffa6f7fe357cc232cf1771a4ce7bc5fb0.jpg"
        },
        {
            id: 4,
            name: "La teoria del dulce de leche",
            quantity: 1,
            price: 2000,
            image: "https://www.finedininglovers.com/es/sites/g/files/xknfdk1706/files/styles/recipes_1200_800_fallback/public/2022-02/dulce-de-leche%C2%A9iStock.jpg?itok=dNtkcbXP"
        },
    ];
    return (
        <div className={style.contenedorGeneral}>
            <div className={style.contenedorCosas}>
                <div className={style.texto}>¡Tu compra fue exitosa!</div>
                <div className={style.contProductos}>
                    {products.map((p) => {
                        return (
                            <div className={style.contItems}>
                                <img src={p.image} alt="img" className={style.images} />
                                {p.name}
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