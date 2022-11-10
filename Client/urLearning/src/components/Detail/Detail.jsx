import React from "react";
import s from "./Detail.module.css"
import image from "../../images/register.png"
import { Rating,Button,Avatar } from "flowbite-react";
import { useState,useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { getDetail } from "../../redux/actions";



const Detail=(props)=>{
  const id=props.match.params.id;
  const dispatch=useDispatch();
  console.log(id)
  const course=useSelector((state)=>state.course);
  useEffect(()=>{
    dispatch(getDetail(id));
  },[dispatch,id])
 console.log(course)
    return (
        <div >
        
        
        <div className={s.main}>
        

        <div className={s.landing}>
        <div className={s.landingLeft}>
        
        <div className={s.conatiner1}>
        <div className={s.head }>
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
      
          <Rating.Star />
          <Rating.Star />
          <Rating.Star />
          <Rating.Star />
          <Rating.Star filled={false} />
          <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
           4.95 out of 5
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
      </div>


        <div className={s.price}>
        <div className={s.name2}>
            <h2>¡Comienza a aprender!</h2>
        </div>
        <div className={s.num}>
          <p>{course.price} US$</p>
        </div>
        
        <div className={s.add}>
        <Button className={s.addb} color="purple">
          Añadir a la cesta
        </Button>
        </div>
        </div>

        
        </div>
      </div>
        </div>

        </div>
    </div>
    )
}

export default Detail