import React, { useEffect } from 'react'
import style from "../CursosComprados/CursosComprados.module.css"
import { useSelector, useDispatch } from "react-redux";
import { getCourses, getUserCourses } from '../../redux/actions';
import { Button } from "flowbite-react"
import { Link } from "react-router-dom";



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
                    {cursosUser.length ? (cursosUser.map((c) => {
                        return (
                            <Link to={`/mycourses/${c.id}`}>
                                <div className={style.curso}>
                                    <img src={c.image} alt="imagen" />
                                    <div className={style.title}>{c.title}</div>
                                    <div className={style.profe}>{c.name_prof}</div>
                                </div>
                            </Link>
                        )
                    })) : (<div className={style.compraCurso}>
                        <div className={style.tituloCompra}>No tienes cursos comprados...</div>
                        <Link to="/allcourses">
                            <Button
                                gradientDuoTone="purpleToBlue"
                                className={style.buttonGo} >
                                Ir a cursos
                            </Button>
                        </Link>
                    </div>

                    )}
                </div>
            </div>
        </div>
    )
}

export default CursosComprados