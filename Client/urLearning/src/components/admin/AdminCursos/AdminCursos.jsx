import React from "react";
import axios from "axios";
import { useEffect,useState } from "react";
import styles from "./Admin.module.css";
import {Link} from "react-router-dom";
import { Rating,Card,Button,Spinner,Select} from "flowbite-react";
import { async } from "@firebase/util";
function AdminCursos(props){
const [cursos,setCursos]=useState([]);


useEffect(()=>{
    const axiosData = async () => {
        let response = await axios.get('/admin/allCourses');
        response=await response.data;
        setCursos(response);
        
      }
   axiosData();
     
    
},[])
const handleChange=(e)=>{
    e.preventDefault()
if(e.target.value==="Activo"){
    const axiosData = async () => {
        let response = await axios.get('/admin/allCourses');
        response=await response.data;
        setCursos(response);
        
      }
   axiosData();
     
}
else if(e.target.value==="Inactivo"){
    const axiosData = async () => {
        let response = await axios.get('/admin/allDeletedCourses');
        response=await response.data;
        setCursos(response);
        
      }
   axiosData();
     
}
}
console.log(cursos);
    return(
        <div className={styles.main}>
        <div className={styles.filtro}>
      <Select
        defaultValue="Activo"
       onChange={e=>handleChange(e)}
      > 
        <option value="Activo">
        Activo
        </option>
        <option value="Inactivo">
        Inactivo
        </option>
      </Select>
    </div>
    <div className={styles.cardscontainer}>
       <Card>
    <div class="flex items-center justify-between mb-4">
        <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Cursos</h5>
    </div>

   <div class="flow-root">
        <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
          {cursos.length?cursos.map((c)=>{
            return(<li class="py-3 sm:py-4">
            <div class="flex items-center space-x-4">
                <div class="flex-shrink-0">
                    <img class="w-8 h-8 rounded-full" src={c.image} alt="icon"/>
                </div>
                <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {c.title}
                    </p>
                    <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                        {c.name_prof}
                    </p>
                </div>
                <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                <Link to={`/admin/cursos/${c.id}`}>
                <Button color="purple">
                 Editar
                </Button>
                </Link>
                </div>
            </div>
        </li>)
          }):<Spinner
          color="purple"
          aria-label="Purple spinner example"
        />}
            
        </ul>
   </div>
   </Card>
</div>
</div>)
}

export default AdminCursos;