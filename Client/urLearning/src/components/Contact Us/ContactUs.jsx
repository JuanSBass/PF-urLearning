import React, { useEffect } from 'react'
import { Label, TextInput, Textarea, Button } from "flowbite-react";
import style from "../Contact Us/ContactUs.module.css"
import img from "../../img/chicoformulario.jpg"
import { getCart, removeItemCart } from '../../redux/actions';
import { useDispatch } from 'react-redux';



function ContactUs() {

    const dispatch = useDispatch()

    useEffect(() => {
        console.log('soy getCart')
        console.log(getCart())
        dispatch(getCart());
    }, [dispatch]);


    const handleDelete = (id) => {
        dispatch(removeItemCart(id))
    }




    return (
        <div className={style.contenedorGeneral}>
            <div className={style.contenedorFormulario}>
                <div className={style.text}>
                    <img className={style.imagenChico} src={img} alt="chicoFormulario" />
                    <div className={style.textTitulo}>¡Contactate con nosotros!</div>
                </div>
                <div className={style.form}>

                    <button onClick={(id) => handleDelete(id)}>Borrar item</button>


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
                                required={true}
                                shadow={true}
                            />
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
                                placeholder='Tu nombre'
                            />
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
                                rows={4}
                            />
                        </div>
                    </div>

                    <Button
                        gradientDuoTone="purpleToBlue"
                        className={style.buttonSubmit}
                        // onClick={showModal}
                        // disabled={btnDisabled}
                        type="submit"
                    >
                        Enviar
                    </Button>

                </div>
            </div>
        </div>
    )
}

export default ContactUs