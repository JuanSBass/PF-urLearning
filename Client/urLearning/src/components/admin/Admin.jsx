import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import s from "./Admin.module.css";

function Admin(props) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    return (<div>
        {user.admin ? <div className={s.container}>
            <Link to="/admin/cursos"><div className={s.nom}>cursos</div></Link>
            <Link to="/admin/usuarios"><div className={s.nom}>usuarios</div></Link>
            <Link to="/admin/pagos"><div className={s.nom}>pagos</div></Link>
        </div> : <h1>No tienes acceso</h1>}


    </div>)
}

export default Admin;