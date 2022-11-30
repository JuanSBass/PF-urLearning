import { Button } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { deleteComment, getComment, getUserCourses } from '../../redux/actions'
import AddComment from '../AddComment/AddComment'
// import AddRating from '../AddRating/AddRating'
import style from "../CursosComprados/DetalleCursoComprado.module.css"

function DetalleCursoComprado() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const cursosComprados = useSelector((state) => state.userCourses);
    const comentarios = useSelector((state) => state.comments);
    const [userActivo, setUserActivo] = useState()




    const [detalle, setDetalle] = useState()

    useEffect(() => {
        // dispatch(getComment())
        !cursosComprados.length && dispatch(getUserCourses())
        cursosComprados.length && setDetalle(cursosComprados.find(e => e.id === id))
        cursosComprados.length && setUserActivo((cursosComprados[0].userCourse.userId))



    }, [dispatch, cursosComprados.length]);






    const handlerDelete = (id) => {
        dispatch(deleteComment(id))
        dispatch(getComment())
    }

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
                <div className={style.reseña}>Reseñas del curso</div>
                <div className={style.comentarios}>
                    {comentarios.map((comentario) => {
                        return (
                            <div className={style.comentario}>

                                <div>
                                    <div className={style.comentUser}>{comentario.name}</div>
                                    <div>{comentario.comment}</div>
                                </div>

                                <div >
                                    {comentario.userId === userActivo && <button onClick={() => handlerDelete(comentario.ID)} className={style.delete}>Eliminar comentario</button>}
                                </div>
                                <hr className={style.hr} />

                            </div>
                        )
                    })}


                </div>
                <AddComment></AddComment>
            </div>

            : "Cargando..."}</div>
    )
}

export default DetalleCursoComprado