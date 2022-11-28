import React, { useEffect, useState } from 'react'
import { Label, TextInput, Textarea, Button } from "flowbite-react";
import style from "./ContactUs.module.css"
import img from "../../img/chicoformulario.jpg"
import { postMessages } from '../../redux/actions';
import { Toaster, toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

export function ContactUs() {

    const dispatch = useDispatch();
    const history = useHistory();
    const [modal, setModal] = useState(false);
    const [errors, setErrors] = useState({});


    function validate(input) {
        const errors = {};
        const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!input.email) errors.email = "Enter an email";
        else if (!input.email.match(mailFormat)) errors.email = "Enter a valid email"
        if (!input.name) { errors.name = "Debe ingresar el nombre"; }
        if (!input.message) { errors.message = "Debe ingresar un mensaje"; }

        return errors
    }


    const showModal = () => {
        setModal(!modal);
        toast.success('Message sent!')
    };


    const [input, setInput] = useState({
        email: "",
        name: "",
        message: "",
    })


    let btnDisabled = !(
        input.email.length &&
        input.name.length)
        ||
        input.message.length > 350 ||
        input.message.length < 10


    useEffect(() => {
        setErrors(
            validate({
                ...input,
            })
        );
    }, [input]);

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
        setErrors(
            validate({
                ...input,
                [e.target.name]: e.target.value,
            })
        );
    }

    const handleSubmit = (ev) => {
        ev.preventDefault();
        dispatch(postMessages(input))
        setInput({
            email: "",
            name: "",
            message: "",
        })
        history.push("/");
    }


    return (
        <div className={style.contenedorGeneral}>
            <form className={style.contenedorFormulario} onSubmit={(e) => handleSubmit(e)}>
                <div className={style.text}>
                    <img className={style.imagenChico} src={img} alt="chicoFormulario" />
                    <div className={style.textTitulo}>¡Contactate con nosotros!</div>
                </div>
                <div className={style.form}>
                    <div className="flex flex-col gap-4">
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="email2"
                                />
                            </div>
                            <TextInput
                                id="email2"
                                type="email"
                                placeholder="tuEmail@gmail.com"
                                onChange={(e) => handleChange(e)}
                                required={true}
                                name="email"
                            />
                            {errors.email && (<div className={style.errores}>{errors.title}</div>)}
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="name"
                                />
                            </div>
                            <TextInput
                                id="base"
                                type="text"
                                sizing="md"
                                required={true}
                                onChange={(e) => handleChange(e)}
                                placeholder='Tu nombre'
                                name="name"
                            />
                            {errors.name && (<div className={style.errores}>{errors.title}</div>)}
                        </div>
                        <div id="textarea">
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="mensaje"
                                />
                            </div>
                            <Textarea
                                id="comment"
                                placeholder="Escribenos un mensaje..."
                                required={true}
                                onChange={(e) => handleChange(e)}
                                rows={4}
                                name="message"
                            />
                            {errors.message && (<div className={style.errores}>{errors.title}</div>)}
                        </div>
                    </div>

                    <Button
                        gradientDuoTone="purpleToBlue"
                        className={style.buttonSubmit}
                        onClick={showModal}
                        disabled={btnDisabled}
                        type="submit"
                    >
                        Enviar
                    </Button>

                </div>

            </form>
            <Toaster
                position="bottom-right"
            />
        </div>
    )
}

export default ContactUs