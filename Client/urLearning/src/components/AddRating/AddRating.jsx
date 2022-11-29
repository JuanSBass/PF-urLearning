import React, { useState } from 'react'
import corazon from "../../img/IoIosHeart.svg"
import { putRating } from '../../redux/actions'
import style from "../AddRating/AddRating.module.css"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom'




function AddRating() {
    const [currentValue, setcurrentValue] = useState(0)
    const [hoverValue, sethoverValue] = useState(undefined)
    const stars = Array(5).fill(0)
    const dispatch = useDispatch()
    const { id } = useParams()


    const handleClick = (value) => {
        setcurrentValue(value)
        dispatch(putRating(currentValue))
    }

    const handleMouse = (newValue) => {
        sethoverValue(newValue)
    }

    const handleMouseLeave = () => {
        sethoverValue(undefined)
    }


    return (
        <div>
            <div className={style.estrellas}>
                {stars.map((_, index) => {
                    return (
                        <div>
                            <img src={corazon} alt="corazon" className={(hoverValue || currentValue) > index ? style.amarillo : style.gris} key={index} onClick={() => handleClick(index + 1)} onMouseOver={() => handleMouse(index + 1)} onMouseLeave={handleMouseLeave} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default AddRating