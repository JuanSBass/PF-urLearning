import style from "../AddFavorite/AddFavorite.module.css"
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { getCourses, getFavorite, getUserCourses } from '../../redux/actions';
import { Button } from "flowbite-react"
import { Link } from "react-router-dom";

function AddFavorite() {

    const cursosFav = useSelector(state => state.favorites)
    const dispatch = useDispatch()
    const tokken = window.localStorage.getItem("tokken");


    useEffect(() => {
        dispatch(getCourses())
        dispatch(getUserCourses())
        dispatch(getFavorite(tokken))
    }, [dispatch, tokken]);

    return (
        <div className={style.contenedorGeneral}>
            <div className={style.contCursos} >
                <div className={style.lineaVioleta}>
                    <Link to="/mycourses" className={style.tab}>
                        Mis Cursos
                    </Link>
                    <hr className={style.hr} />
                    <Link to="/favourites" className={style.tab}>
                        Mis Favoritos
                    </Link>
                </div>
                <div className={style.subTitle}>Mis Favoritos</div>
                <div className={style.cursos}>
                    {cursosFav.length ? (cursosFav.map((c) => {
                        return (
                            <Link to={`/mycourses/${c.id}`} key={c.id}>
                                <div className={style.curso} key={c.id}>
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

export default AddFavorite