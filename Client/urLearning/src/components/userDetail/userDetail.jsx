import React from "react";
import s from "./userDetail.module.css"
import {useSelector,useDispatch} from "react-redux"
import { useEffect } from "react";
import { getUserDetail } from "../../redux/actions";
const userDetail=(props)=>{
const dispatch=useDispatch() 
useEffect(()=>{
    dispatch(getUserDetail());

},[dispatch])
const user=useSelector(state=>state.userDetail)
return (<div className={s.landingLeft}>
    <h1>{user.name}</h1>


</div>) 

}

export default userDetail;