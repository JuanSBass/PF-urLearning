import React from 'react'
import { Label, Textarea, Button } from "flowbite-react"
import { useState } from 'react'
import { useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { getComment, postComment, putRating } from '../../redux/actions';
import style from "../AddComment/AddComment.module.css"
import corazon from "../../img/IoIosHeart.svg"
import { FaStar } from "react-icons/fa";

// import AddRating from '../AddRating/AddRating';


function AddComment() {
    const [input, setInput] = useState({
        comment: ""
    })

    const { id } = useParams()
    const dispatch = useDispatch()
    const [currentValue, setcurrentValue] = useState({
        rating: ""
    })
    const [hoverValue, sethoverValue] = useState(undefined)
    const stars = Array(5).fill(0)


    const handleChange = (ev) => {
        setInput({
            ...input,
            [ev.target.name]: ev.target.value,
        });
    }

    const handleClick = (value) => {
        setcurrentValue(value)

    }

    const handleMouse = (newValue) => {
        sethoverValue(newValue)
    }

    const handleMouseLeave = () => {
        sethoverValue(undefined)
    }

    const handleSubmit = (ev) => {
        ev.preventDefault();
        dispatch(postComment(id, input));
        dispatch(putRating(id, currentValue))
        setInput({
            comment: ""
        });
        dispatch(getComment())
        sethoverValue(undefined)
        setcurrentValue({
            rating: ""
        })

    };

    let btndisabled = !(
        currentValue &&
        input.comment.length
    )

    return (
        <div>
            <div className={style.reseña}>¡Deja tu reseña!</div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className={style.estrellas}>
                    {stars.map((_, index) => {
                        return (
                            <div>
                                <FaStar
                                    className={(hoverValue || currentValue) > index ? style.amarillo : style.gris}
                                    key={index}
                                    onClick={() => handleClick(index + 1)}
                                    onMouseOver={() => handleMouse(index + 1)}
                                    onMouseLeave={handleMouseLeave}
                                />
                            </div>
                        )
                    })}
                </div>
                <div id="textarea">
                    <div className="mb-2 block">
                        <Label
                            htmlFor="comment"
                        />
                    </div>
                    <Textarea
                        id="comment"
                        placeholder="Deja un comentario..."
                        required={true}
                        rows={4}
                        onChange={(e) => handleChange(e)}
                        name="comment"
                        value={input.comment}
                    />
                </div>
                <Button
                    gradientDuoTone="purpleToBlue"
                    type="submit"
                    className={style.boton}
                    disabled={btndisabled}
                >
                    Comentar
                </Button>
            </form>
        </div>
    )
}

export default AddComment