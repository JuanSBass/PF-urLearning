import React from "react";
import axios from "axios";
import { useEffect,useState } from "react";
import styles from "./Admin.module.css";
import {Link} from "react-router-dom";
import { Rating } from "flowbite-react";
import { async } from "@firebase/util";
function AdminCursos(props){
const [cursos,setCursos]=useState([]);
const getCourse=async()=>{
    const response=await axios.get("/admin/allCourses");
    return response.data;
}


useEffect(()=>{
    const axiosData = async () => {
        let response = await axios.get('/admin/allCourses');
        response=await response.data;
        setCursos(response);
        
      }
   axiosData();
     
    
},[])
console.log(cursos);
    return(<div className={styles.cardscontainer}>
            {cursos?.map((card)=>(
                <div className={styles.card} key={card.id}>
                <Link to={`/admin/${card.id}`} key={card.id}>
                  <div className={styles.imgcard}>
                    <img src={card.image} alt="miniatura" />
                  </div>
                </Link>
                <h3>{card.title}</h3>
                <p>{card.name_prof}</p>
                <Rating>
                  <Rating.Star filled={card.rating > 0} />
                  <Rating.Star filled={card.rating > 1} />
                  <Rating.Star filled={card.rating > 2} />
                  <Rating.Star filled={card.rating > 3} />
                  <Rating.Star filled={card.rating > 4} />
                  <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                    {card.rating} out of 5
                  </p>
                </Rating>
                <button type="button" class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-1 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900" onClick={() => handleClick(card)}>Add to Cart</button>
              </div>
            ))
                
            }
    </div>)
}

export default AdminCursos;