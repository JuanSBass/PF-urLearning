import React from "react";
import s from "./userDetail.module.css"
import {useSelector,useDispatch} from "react-redux"
import { useEffect ,useState} from "react";
import { getUserDetail,putUser,logIn } from "../../redux/actions";
import { Button } from "flowbite-react";
import { TextInput } from "flowbite-react";
import { useHistory } from "react-router-dom";

const userDetail=(props)=>{
const [edit,setEdit]=useState(false);
const [inputs,setInputs]=useState({name:"",
                                    image:""})
const dispatch=useDispatch() 
const history=useHistory();
const handleClick=()=>{
    setEdit(!edit);
}
const handleSubmit=()=>{
    dispatch(putUser(inputs));
    setEdit(!edit);
    setInputs({name:"",image:""});
    dispatch(getUserDetail());
    history.push("/");
    
}
const handleChange = (e) => {
    e.preventDefault();
    setInputs({ ...inputs, [e.target.name]: e.target.value })

  }
useEffect(()=>{
    dispatch(getUserDetail());

},[dispatch])
const user=useSelector(state=>state.userDetail)
return (
<div className={s.main}>

<div className={s.head}>
<h1>Mis Datos</h1>
</div>
<div className={s.landing}>


<div className={s.landingLeft}>
<div  className={s.name}>
<label  className={s.labe} >Nombre:</label>

{edit?<TextInput name="name" onChange={(e)=>{handleChange(e)}} value={inputs.name} id="base"type="text"sizing="md" placeholder='Tu nombre' />
:<h1 className={s.labe}>{user.name}</h1>}
</div>
<div  className={s.email}>
<label  className={s.labe} >Email:</label>

<h1 className={s.labe}>{user.email}</h1>
</div>
{edit?<Button className={s.edit} gradientMonochrome="purple" onClick={handleSubmit}>
        Enviar
</Button>:<Button className={s.edit} gradientMonochrome="purple" onClick={handleClick}>
        Editar
</Button>}
    
    

</div>
<div className={s.landingRight}>
    <div className={s.icon}>
    <img className={s.userImg} src={user.image}/>
    {edit&&<TextInput onChange={(e)=>{handleChange(e)}} name="image" value={inputs.image} id="base"type="text"sizing="md" placeholder='Url' />}
    </div>

</div>
</div>


</div>

) 

}

export default userDetail;