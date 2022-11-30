import React from "react";
import s from "./Detail.module.css"
import image from "../../images/register.png"
import { Rating, Button, Avatar, Spinner } from "flowbite-react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, cleanDetail, postProductCart } from "../../redux/actions";
import { Toaster, toast } from 'react-hot-toast';


const Detail = (props) => {
  const id = props.match.params.id;
  const dispatch = useDispatch();
  const course = useSelector((state) => state.course);
  const cart = useSelector(state => state.carrito)

  const userTokken = window.localStorage.getItem("tokken");


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
  console.log(course.videos)
  useEffect(() => {
    dispatch(getDetail(id))
    return function () { dispatch(cleanDetail()) }

  }, [dispatch, id])

  return (<div>

    {course.title ? <div >


      <div className={s.main}>


        <div className={s.landing}>
          <div className={s.landingLeft}>

            <div className={s.conatiner1}>
              <div className={s.head}>
                <h1>{course.title}</h1>

              </div>

              <div className={s.name}>

                <h2>{course.name_prof}</h2>

              </div>
              <div className={s.im}>
                <img alt="img" className={s.imagen} src={course.image} />
              </div>
              <div className={s.rating}>
                <Rating size="md">
                  <Rating.Star filled={course.rating > 0} />
                  <Rating.Star filled={course.rating > 1} />
                  <Rating.Star filled={course.rating > 2} />
                  <Rating.Star filled={course.rating > 3} />
                  <Rating.Star filled={course.rating > 4} />
                  <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                    {course.rating} out of 5
                  </p>
                </Rating>
              </div>


            </div>
          </div>
          <div className={s.landingRight}>
            <div className={s.conatinerf}>
              <div className={s.container2}>
                <div className={s.sub}>
                  <h2> Qué aprenderás en este curso</h2>
                </div>
                <div className={s.parrafo}>
                  <p>{course.description}</p>
                </div>

                <video controls autoPlay id={s.vid} height={course.videos[0].height / 2} width={course.videos[0].width / 2}>
                  <source src={course.videos[0].fileURL} type="video/mp4" />
                  {/* pendiente para revisar con Juan */}
                </video>
                {console.log(course.videos)}

              </div>


              <div className={s.price}>
                <div className={s.name2}>
                  <h2>¡Comienza a aprender!</h2>
                </div>
                <div className={s.num}>
                  <p>{course.price} US$</p>
                </div>

                <div className={s.add}>
                  <Button className={s.addb} color="purple" onClick={handleClick}>
                    Añadir a la cesta
                  </Button>
                </div>
              </div>


            </div>
          </div>
        </div>
        <Toaster
          position="bottom-right"
        />
      </div>
    </div> : <div className={s.carga}>
      <Spinner
        color="purple"
        aria-label="Purple spinner example" />
    </div>}
  </div>
  )
}

export default Detail
