import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { async } from "@firebase/util";
import style from "../AdminUsuarios/AdminUsuarios.module.css"



function AdminUsuarios(props) {

    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        const response = await axios.get("/admin/allUsers", {
        });
        return response.data;
    }

    useEffect(() => {
        const axiosData = async () => {
            let response = await axios.get('/admin/allUsers');
            response = response.data;
            setUsers(response);
        }
        axiosData();
    }, [])
    console.log(users);
    return (
        <div className={style.contenedorGeneral}>

            <button>get</button>



            {users?.map((usuario) => (
                <p>{usuario.name}</p>
            ))}













        </div>
    )
}

export default AdminUsuarios;