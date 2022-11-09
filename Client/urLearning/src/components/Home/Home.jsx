import React from "react";
import { useState,useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { getCourses } from "../../redux/actions";





const Home=(props)=>{
const dispatch=useDispatch();
useEffect(()=>{
    dispatch(getCourses())

},[dispatch])

const courses=useSelector((state)=>state.courses);
console.log(courses)
    return(<div>
        {courses.map(u=>{<h1>{u.name}</h1>})}
    </div>)
}
export default Home