import React from "react";
import s from "./Detail.module.css"
import image from "../../images/register.png"
import { Rating,Button,Avatar } from "flowbite-react";


const Detail=(props)=>{
    return (
        <div >
        
        
        <div className={s.main}>
        

        <div className={s.landing}>
        <div className={s.landingLeft}>
        
        <div className={s.conatiner1}>
        <div className={s.head }>
        <h1>APRENDE A TOCAR LA GUITARRA</h1>
  
        </div>

        <div className={s.name}>
        
            <h2>NOMBRE PROFESOR</h2>

        </div>
        <div className={s.im}>
        <img alt="img" className={s.imagen} src={image} />
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
          <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
          </div>
      </div>


        <div className={s.price}>
        <div className={s.name2}>
            <h2>¡Comienza a aprender!</h2>
        </div>
        <div className={s.num}>
          <p>16,544 US$</p>
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