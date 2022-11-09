import React from "react"
import s from "./Register.module.css"
import image from "../../images/register.png"
import logo from "../../images/urLearning.png"
import { useState,useEffect } from "react"
import {useDispatch,useSelector} from "react-redux"
import { useHistory } from "react-router-dom";
const Register=(props)=>{
  const [inputs,setInputs]=useState({email:"",password:""});
  const [errors,setErrors]=useState({});
  const validate=(input)=>{
  const errors={};
  const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if(!input.email)errors.email="Enter an email";
  else if(!input.email.match(mailFormat))errors.email="Enter a valid email"
  if(!input.password)errors.password="Enter a password";
  else if(!input.password.match(/(?=.*[A-Z])/))errors.password="Must contain at least 1 uppercase alphabetical character"
  else if(!input.password.match(/(?=.*[0-9])/))errors.password="Must contain at least 1 numeric character"
  else if(!input.password.match(/(?=.{8,12})/))errors.password="Must contain between 8 and 12 charcters"

  return errors;
  }
  const handleChange=(e)=>{
    e.preventDefault();
    setInputs({...inputs,[e.target.name]:e.target.value})
   setErrors(validate({...inputs,[e.target.name]:e.target.value})) 
  }
console.log(errors);
    return(
    
        <div >
           
        
            <div className={s.main}>
            

            <div className={s.landing}>
            <div className={s.landingLeft}>
            <div className={s.head}>
                <img className={s.logo} src={logo} alt="img"/>
                <h3 className={s.sub}>Una nueva forma de enseñar</h3>
            </div>
           
            <div className={s.form}>
              <form>
            <div className={s.email}>
            
            <label  className={s.labe} for="email-address-icon" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
            <div class="relative">
             <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
            </div>
            <input type="text" onChange={(e)=>{handleChange(e)}} name="email" id="email-address-icon" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@email.com"/>
            </div>
            <p className={s.errors}>{errors.email}</p>
            </div>
            <div className={s.password}>
            <label for="password" className={s.labe} class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Password</label>
            <input type="password" onChange={(e)=>{handleChange(e)}} name="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
            <p className={s.errors}>{errors.password}</p>
            </div>
            
            <div className={s.login}>
            <button  type="button" class="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Login</button>
            </div>

            
            <div className={s.google}>
            <button type="button" class="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
            <svg class="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
            Sign in with Google
            </button>
            </div>
            </form>
    

            </div>
            </div>
          <div className={s.landingRight}>
            <img alt="img" className={s.imagen} src={image} />
          </div>
            </div>
    
            </div>
        </div>
    )
}
export default Register;