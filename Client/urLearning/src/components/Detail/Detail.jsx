import React from "react";
import s from "./Detail.module.css"
import image from "../../images/register.png"
import { Rating, Button, Avatar, Spinner } from "flowbite-react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, cleanDetail, postProductCart, getComment } from "../../redux/actions";
import { Toaster, toast } from 'react-hot-toast';


const Detail = (props) => {
  const id = props.match.params.id;
  const dispatch = useDispatch();
  const course = useSelector((state) => state.course);
  const cart = useSelector(state => state.carrito)
  const comentarios = useSelector((state) => state.comments);


  const userTokken = window.localStorage.getItem("tokken");
  const comentariosCurso = comentarios.filter((c) => c.idCourse === id)

  const handleClick = (e) => {
    e.preventDefault();
    const existe = cart.filter((e) => {
      return (e?.id === course.id)
    })?.length > 0
    if (existe) {
      toast.error('Course exits!')
      return
    }
    dispatch(postProductCart(course, userTokken));
    toast.success('Added Course!')
  }

  // let urlVideos = []
  // console.log(course.videos)
  useEffect(() => {
    dispatch(getDetail(id))
    dispatch(getComment())
    return function () { dispatch(cleanDetail()) }

  }, [dispatch, id])

  return (

    course.title ? <div>

      <div className={s.general}>

        <div className={s.contenedorGeneral}>
          <div className={s.contenedorFormulario}>
            <div className={s.landingLeft}>
              <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                  <img class="rounded-t-lg" src={course.image} alt="gg" />
                </a>
                <div class="p-5">
                  <a href="#">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{course.title}</h5>
                  </a>
                  <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{course.name_prof} </p>
                  <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{course.description} </p>
                  <div className={s.rating}>
                    <Rating size="md">
                      <Rating.Star filled={course.ratingHistory > 0} />
                      <Rating.Star filled={course.ratingHistory > 1} />
                      <Rating.Star filled={course.ratingHistory > 2} />
                      <Rating.Star filled={course.ratingHistory > 3} />
                      <Rating.Star filled={course.ratingHistory > 4} />
                      <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                        {course.ratingHistory} out of 5
                      </p>
                    </Rating>
                  </div>
                </div>
              </div>
            </div>

            <div className={s.landingRight}>

              <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                <div class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white" className={s.titulo}>Qué aprenderás en este curso</div>
                <br />
                <video controls autoPlay id={s.vid} height={course.videos[0].height / 2} width={course.videos[0].width / 2}>
                  <source src={course.videos[0].fileURL} type="video/mp4" />
                </video>
                <div class="p-5">
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">¡Comienza a aprender!</h5>
                  <p class="mb-3 font-normal text-gray-900 dark:text-gray-400" className={s.precio}>{course.price}US$</p>
                  <Button className={s.addb} color="purple" onClick={handleClick}>
                    Añadir a la cesta
                  </Button>
                </div>
              </div>
            </div>

          </div >

        </div>
        <div className={s.contComentario}>
          <div className={s.reseña}>Reseñas sobre el curso</div>
          <div className={s.comments}>
            {comentariosCurso ? comentariosCurso.map((c) => {
              return (
                <div className={s.comment}>
                  <div>{c.name}</div>
                  <div>{c.comment}</div>
                  <hr className={s.hr} />
                </div>

              )
            }) : <div>No hay comentarios...</div>}
          </div>
        </div>

      </div>
      <Toaster
        position="bottom-right"
      />
    </div> : <div className={s.carga}>
      <Spinner
        color="purple"
        aria-label="Purple spinner example" />
    </div>
  )
}

export default Detail

