import React from "react";
import axios from "axios";
import { useEffect,useState } from "react";
import styles from "./AdminUser.module.css";
import {Link} from "react-router-dom";
import { Rating,Card,Button,Spinner} from "flowbite-react";
import { async } from "@firebase/util";
function AdminUser(props){
const [users,setUsers]=useState([]);



useEffect(()=>{
    const axiosData = async () => {
        let response = await axios.get('/admin/allUsers');
        response=await response.data;
        setUsers(response);
        
      }
   axiosData();
     
    
},[])

    return(<div className={styles.cardscontainer}>
       <Card>
    <div class="flex items-center justify-between mb-4">
        <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Usuarios</h5>
    </div>

   <div class="flow-root">
        <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
          {users.length?users.map((c)=>{
            return(<li class="py-3 sm:py-4">
            <div class="flex items-center space-x-4">
                <div class="flex-shrink-0">
                    <img class="w-8 h-8 rounded-full" src={c.image} alt="icon"/>
                </div>
                <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {c.name}
                    </p>
                    <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                        {c.email}
                    </p>
                </div>
                <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                <Link to={`/admin/cursos/${c.name}`}>
                <Button color="purple">
                 Editar
                </Button>
                </Link>
                <Button color="failure">
                    Eliminar
                </Button>
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
</div>)
}

export default AdminUser;