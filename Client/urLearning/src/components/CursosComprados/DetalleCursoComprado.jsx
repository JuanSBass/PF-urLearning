import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getComment, getUserCourses } from '../../redux/actions'
import AddComment from '../AddComment/AddComment'
import style from "../CursosComprados/DetalleCursoComprado.module.css"



function DetalleCursoComprado() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const cursosComprados = useSelector((state) => state.userCourses);
    const comentarios = useSelector((state) => state.comments);
    console.log(comentarios)

    const [detalle, setDetalle] = useState()

    useEffect(() => {
        dispatch(getComment())
        !cursosComprados.length && dispatch(getUserCourses())
        cursosComprados.length && setDetalle(cursosComprados.find(e => e.id === id))
    }, [dispatch, cursosComprados.length]);

    return (
        <div className={style.contenedorGeneral}>{detalle ?

            <div className={style.contVideo}>
                <div className={style.contenedorArriba}>

                    <div className={style.title}>{detalle.title}</div>
                    <video controls autoPlay id={style.video}>
                        <source src={detalle.videos.linksVideos[0].fileURL} type="video/mp4" />
                    </video>
                </div>

                <div className={style.acercaCurso}>Acerca de este curso</div>
                <div className={style.contenedorAbajo}>

                    <div className={style.izq}>

                        <div> <small className={style.prueba}>Profesor</small> {detalle.name_prof}</div>
                        <hr className={style.linea} />
                        <div> <small className={style.prueba}>Duration</small> {detalle.duration}hr</div>
                        <hr className={style.linea} />

                        <div> <small className={style.prueba}>Language</small> {detalle.language}</div>
                        <hr className={style.linea} />

                        <div> <small className={style.prueba}>Level</small> {detalle.level}</div>
                    </div>
                    <hr className={style.lineaMedio} />
                    <div className={style.der}>

                        <div>{detalle.description}</div>
                    </div>
                </div>
                {comentarios?.map((c) => {
                    return (
                        <div>{c.comment}</div>
                    )
                })}
                <AddComment>X</AddComment>
            </div>

            : "Cargando..."}</div>
    )
}

export default DetalleCursoComprado