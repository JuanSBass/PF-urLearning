import React, { useEffect } from 'react'
import style from "../CursosComprados/CursosComprados.module.css"
import { useSelector, useDispatch } from "react-redux";
import { getCourses, getUserCourses } from '../../redux/actions';


function CursosComprados() {
    // const cursosPrueba = useSelector(state => state.courses)
    const cursosUser = useSelector(state => state.userCourses)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getCourses())
        dispatch(getUserCourses())
    }, [dispatch]);

    // console.log(cursosUser)

    return (
        <div className={style.contenedorGeneral}>
            <div className={style.contCursos} >
                <div className={style.lineaVioleta}>Mis cursos</div>
                <div className={style.cursos}>
                    {cursosUser?.map((c) => {
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