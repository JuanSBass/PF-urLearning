import React from 'react'
import { Label, Textarea, Button } from "flowbite-react"
import { useState } from 'react'
import { useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { postComment } from '../../redux/actions';


function AddComment() {
    const [input, setInput] = useState("")

    const { id } = useParams()
    const dispatch = useDispatch()
    const handleChange = (ev) => {
        setInput({
            ...input,
            [ev.target.name]: ev.target.value,
        });
    }


    const handleSubmit = (ev) => {
        ev.preventDefault();
        dispatch(postComment(id, input));
        setInput("");

    };


    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>

                <div id="textarea">
                    <div className="mb-2 block">
                        <Label
                            htmlFor="comment"
                            value="Reseñas"
                        />
                    </div>
                    <Textarea
                        id="comment"
                        placeholder="Deja un comentario..."
                        required={true}
                        rows={4}
                        name="comment"
                        onChange={(e) => handleChange(e)}
                    />
                    <Button
                        gradientDuoTone="purpleToBlue"
                        type="submit"
                    >
                        Comentar
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default AddComment