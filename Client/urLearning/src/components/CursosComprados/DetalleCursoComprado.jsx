import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getUserCourses } from '../../redux/actions'
import style from "../CursosComprados/DetalleCursoComprado.module.css"

function DetalleCursoComprado() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const cursosComprados = useSelector((state) => state.userCourses);
    const [detalle, setDetalle] = useState()

    useEffect(() => {
        !cursosComprados.length && dispatch(getUserCourses())
        cursosComprados.length && setDetalle(cursosComprados.find(e => e.id === id))
    }, [dispatch, cursosComprados.length]);

    return (
        <div className={style.contenedorGeneral}>{detalle ?


            <div className={style.contVideo}>

                <div className={style.title}>{detalle.title}</div>
                <video controls autoPlay id={style.video}>
                    <source src={detalle.videos.linksVideos[0].fileURL} type="video/mp4" />
                </video>
                <div className={style.acercaCurso}>Acerca de este curso</div>
                <div>{detalle.name_prof}</div>
                <div>{detalle.category} {detalle.subCategory}</div>
                <div>{detalle.duration}hr</div>
                <div>{detalle.language}</div>
                <div>{detalle.level}</div>
                <div>{detalle.description}</div>
            </div>

            : "Cargando..."}</div>
    )
}

export default DetalleCursoComprado