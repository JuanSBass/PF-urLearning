import React from "react";
import s from "./DetalleUsuario.module.css"
import axios from "axios"
import { useEffect, useState } from "react";


import { Button } from "flowbite-react";
import { TextInput } from "flowbite-react";
import { useHistory, useParams } from "react-router-dom";
import swal from 'sweetalert';

const AdminUserDetail = (props) => {
    const history = useHistory();
    const [edit, setEdit] = useState(false);
    const [inputs, setInputs] = useState({
        name: "",
        image: ""
    })
    const { id } = useParams();
    const [user, setUser] = useState([])
    const handleClick = () => {
        setEdit(!edit);
    }
    const handleSubmit = () => {

        setEdit(!edit);

        const axiosData = async () => {
            let response = await axios.put('/admin/changeUser', { id: id, name: inputs.name, image: inputs.image });
        }
        setInputs({ name: "", image: "" });
        axiosData();
        swal("¡Datos actualizados!", "Da click en OK para ver cambios", "success")
            .then(update => {
                const axiosData = async () => {
                    let response = await axios.get('/admin/detail',
                        {
                            headers: {
                                id: id,
                            }
                        });
                    response = await response.data;
                    setUser(response);
                }
                axiosData();
            });
    }
    const handleDes = () => {
        swal({
            title: "¿Estás seguro?",
            text: "Una vez deshabilitado, podrás habilitarlo de nuevo...",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDes) => {
                if (willDes) {
                    const axiosData = async () => {
                        let response = await axios.delete('/admin/deleteUserId', { headers: { id: id } });
                    }
                    axiosData();
                    swal("¡Usuario deshabilitado!", {
                        icon: "success",
                    })
                        .then(go => history.push("/admin"))
                } else {
                    swal("El usuario sigue habilitado.");
                }
            });

    }
    const handlehab = () => {
        swal({
            title: "¿Estás seguro?",
            text: "Una vez habilitado, podrás deshabilitarlo de nuevo...",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willHab) => {
                if (willHab) {
                    const axiosData = async () => {
                        let response = await axios.put('/admin/restoreUser', { restoreUserId: id });
                    }
                    axiosData();
                    swal("¡Usuario habilitado!", {
                        icon: "success",
                    })
                        .then(go => history.push("/admin"))
                } else {
                    swal("El usuario sigue deshabilitado.");
                }
            });

    }
    const handleAdmin = () => {
        swal({
            title: "¿Estás seguro?",
            text: "Un gran poder conlleva una gran responsabilidad...",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willAdmin) => {
                if (willAdmin) {
                    const axiosData = async () => {
                        let response = await axios.put('/admin/makeAdmin', { userAdminId: id });
                    }
                    axiosData();
                    swal(`¡Ahora ${user.name} es Admin!`, {
                        icon: "success",
                    })
                        .then(go => history.push("/admin"))
                } else {
                    swal("El usuario aun no es admin.");
                }
            });

    }
    const handleChange = (e) => {
        e.preventDefault();
        setInputs({ ...inputs, [e.target.name]: e.target.value })

    }
    useEffect(() => {
        const axiosData = async () => {
            let response = await axios.get('/admin/detail',
                {
                    headers: {
                        id: id,
                    }
                });
            response = await response.data;
            setUser(response);

        }
        axiosData();


    }, [])
    console.log(user);
    return (
        <div className={s.main}>

            <div className={s.head}>
                <h1>Mis Datos</h1>
            </div>
            <div className={s.landing}>


                <div className={s.landingLeft}>
                    <div className={s.name}>
                        <label className={s.labe} >Nombre:</label>

                        {edit ? <TextInput name="name" onChange={(e) => { handleChange(e) }} value={inputs.name} id="base" type="text" sizing="md" placeholder='Tu nombre' />
                            : <h1 className={s.labe}>{user.name}</h1>}
                    </div>
                    <div className={s.email}>
                        <label className={s.labe} >Email:</label>

                        <h1 className={s.labe}>{user.email}</h1>
                    </div>
                    <div>

                    </div>
                    <div className={s.but}>
                        {edit ? <Button gradientMonochrome="purple" onClick={handleSubmit}>
                            Enviar
                        </Button> : <Button gradientMonochrome="purple" onClick={handleClick}>
                            Editar
                        </Button >}
                        {user.deletedAt ? <Button onClick={handlehab} color="success">
                            Habilitar
                        </Button> : <Button onClick={handleDes} color="failure">
                            Deshabilitar
                        </Button>}
                        {!user.admin && <Button onClick={handleAdmin} size="sm" >
                            Hacer admin
                        </Button>}

                    </div>





                </div>
                <div className={s.landingRight}>
                    <div className={s.icon}>
                        <img className={s.userImg} src={user.image} />
                        {edit && <TextInput onChange={(e) => { handleChange(e) }} name="image" value={inputs.image} id="base" type="text" sizing="md" placeholder='Url' />}
                    </div>

                </div>
            </div>


        </div>

    )

}

export default AdminUserDetail;
