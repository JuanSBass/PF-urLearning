import React, { useEffect } from 'react'
import style from "../CursosComprados/CursosComprados.module.css"
import { useSelector, useDispatch } from "react-redux";
import { getCourses } from '../../redux/actions';



function CursosComprados() {
    const cursosPrueba = useSelector(state => state.courses)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getCourses())
    }, [dispatch]);


    return (
        <div className={style.contenedorGeneral}>
            <div className={style.contCursos} >
                <div className={style.lineaVioleta}>Mis cursos</div>
                <div className={style.cursos}>
                    {cursosPrueba?.map((c) => {
                        return (
                            <div className={style.curso}>
                                <img src={c.image} alt="imagen" />
                                <div className={style.title}>{c.title}</div>
                                <div className={style.profe}>{c.name_prof}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default CursosComprados