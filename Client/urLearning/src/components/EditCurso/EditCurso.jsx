import React from 'react'
import style from "../EditCurso/EditCurso.module.css"
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import {
    Label,
    Select,
    TextInput,
    Textarea,
    Button,

} from "flowbite-react";
import {
    getChildCategory,
    postCourse,
    getCategory,
    getCourses,
    getDetail,
} from "../../redux/actions";
import { useHistory, useParams } from "react-router-dom";


const LANGUAGE = ["english", "spanish"];
const LEVEL = ["easy", "medium", "advanced"];

function validate(input) {
    const errors = {};
    if (!input.title) {
        errors.title = "Debe ingresar un titulo";
    }

    if (!input.name_prof) {
        errors.name_prof = "Debe ingresar el nombre del profesor";
    }

    if (!input.description || input.description.length < 15 || input.description.length > 200) {
        errors.description = "Debe tener entre 15 y 200 caracteres";
    }



    return errors;
}

function EditCurso() {
    const category = useSelector((state) => state.category);
    const subCategories = useSelector((state) => state.subCategories);
    const [courseDetail,setCourse] = useState({})
    const courses = useSelector((state) => state.courses);
    const user = useSelector((state) => state.user);


    const [modal, setModal] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams()

    const showModal = () => {
        setModal(!modal);
    };

    const [input, setInput] = useState({
        title: "",
        image: "",
        duration: "",
        description: "",
        language: "",
        price: "",
        level: "",
        name_prof: "",
        videos: []
    });
    const [errors, setErrors] = useState({});


    let btnDisabled = !(
        input.title &&
  
        input.description &&
        input.price &&
        input.level &&
        input.name_prof &&

        input.language
    ) ||
        input.description.length > 200 ||
        input.description.length < 15

    useEffect(() => {
        const axiosData = async () => {
            let response = await axios.get(`edit/editCourse/${id}`);
            response = await response.data;
            setCourse(response);

        }
        axiosData();
        
    }, [dispatch, id]);

    useEffect(() => {
        if (courseDetail.id) {
            setInput({
                ...courseDetail
            })
        }
    }, [dispatch, courseDetail]);





    useEffect(() => {
        setErrors(
            validate({
                ...input,
            })
        );
    }, [input]);

    const handleChange = (ev) => {
        setInput({
            ...input,
            [ev.target.name]: ev.target.value,
        });

        setErrors(
            validate({
                ...input,
                [ev.target.name]: ev.target.value,
            })
        );
    };

    const handleSelect = (ev) => {
        if (ev.target.name === "subCategory") {
            setInput({
                ...input,
                subCategory: ev.target.value,
            });
        } else if (ev.target.name === "category") {
            let categorySelected = category.find((c) => c.id === ev.target.value);
            setInput({
                ...input,
                category: categorySelected.name,
            });
            dispatch(getChildCategory(categorySelected.id));
        } else if (ev.target.name === "language") {
            setInput({
                ...input,
                language: ev.target.value,
            });
        } else if (ev.target.name === "level") {
            setInput({
                ...input,
                level: ev.target.value,
            });
        }
    };

    const handleSubmit = (ev) => {
        ev.preventDefault();
        const axiosData = async () => {
            try {
                let response = await axios.put(`edit/editCourse/${id}`,
                {        
                    title:input.title,
                    image:input.image,
                    name_prof:input.name_prof,
                    description:input.description,
                    duration:input.duration,
                    price:input.price,});
                
            } catch (error) {
                console.log(error.message);
            }


            
          }
       axiosData();

       /*  history.push("/coursescreated"); */
        dispatch(getCourses());
    };



    const [video, setVideo] = useState({ linksVideos: [] });
    const [loading, setLoading] = useState(false);

    const handleDrop = (files) => {
        const uploaders = files.map(file => {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("tags", `codeinfuse, medium, gist`);
            formData.append("upload_preset", "urLearning");
            formData.append("api_key", "983694461673571");
            formData.append("timestamp", (Date.now() / 1000) | 0);
            setLoading(true);
            return axios
                .post("https://api.cloudinary.com/v1_1/dv2xlr9k0/video/upload", formData, {
                    headers: { "X-Requested-With": "XMLHttpRequest" },
                })
                .then(response => {
                    const data = response.data;
                    console.log(data);
                    const fileURL = data.secure_url;
                    const height = data.height;
                    const width = data.width;
                    // console.log(fileURL);


                    video.linksVideos.push({
                        fileURL,
                        height,
                        width
                    });
                    const newObj = { ...video }
                    setVideo(newObj)
                    setInput({
                        ...input,
                        videos: newObj
                    })
                    console.log(video);
                })

        })
        axios.all(uploaders).then(() => {
            setLoading(false)
        }).catch(error => console.log(error.response.data.error));

    }
const handleDelete=()=>{
    const axiosData = async () => {
        try {
            let response = await axios.delete(`admin/deleteCourse/${id}`)

        } catch (error) {
            console.log(error.message);
        }


        
      }
   axiosData();
}
console.log(courseDetail);
    return (
        <div className={style.contenedorGeneral}>
            <div className={style.contenedorFormulario}>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className={style.formulario}>
                        <div className={style.izq}>
                            <div className={style.text}>
                                ¡Comparte al mundo tu conocimiento!
                            </div>

                            <div className={style.categoriasJuntas}>
                                <div className={style.cate}>
                                    <div className="mb-2 block">
                                        <Label htmlFor="title" value="Title" />
                                    </div>
                                    <TextInput
                                        id="title"
                                        type="text"
                                        value={input.title}
                                        required={true}
                                        onChange={(e) => handleChange(e)}
                                        name="title"
                                    />
                                    {errors.title && (
                                        <div className={style.errores}>{errors.title}</div>
                                    )}
                                </div>

                                <div className={style.cate}>
                                    <div className="mb-2 block">
                                        <Label htmlFor="name_prof" value="Teacher Name" />
                                    </div>
                                    <TextInput
                                        id="name_prof"
                                        type="text"
                                        required={true}
                                        value={input.name_prof}
                                        onChange={(e) => handleChange(e)}
                                        name="name_prof"
                                    />
                                    {errors.name_prof && (
                                        <div className={style.errores}>{errors.name_prof}</div>
                                    )}
                                </div>
                            </div>


                            <div id="textarea" className={style.desc}>
                                <div className="mb-2 block">
                                    <Label htmlFor="description" value="Your description" />
                                </div>
                                <Textarea
                                    id="description"
                                    placeholder="Description..."
                                    required={true}
                                    rows={4}
                                    value={input.description}
                                    onChange={(e) => handleChange(e)}
                                    name="description"
                                />
                                {errors.description && (
                                    <div className={style.errores}>{errors.description}</div>
                                )}
                            </div>
                            {user.admin&&(courseDetail.deletedAt? <Button onClick={handleDelete} color="failure">Eliminar Curso</Button>:<Button color="success">Habilitar curso</Button>)}
                        </div>

                        <div className={style.der}>
                            <div className={style.categoriasJuntas}>
                                <div id="select" className={style.cate}>
                                    <div className="mb-2 block">
                                        <Label htmlFor="language" value="Select your language" />
                                    </div>
                                    <Select
                                        id="language"
                                        onChange={(e) => handleSelect(e)}
                                        name="language"
                                        defaultValue="title"
                                    >
                                        <option value="title" disabled name="Choose category">
                                            Language
                                        </option>
                                        {LANGUAGE.map((l) => {
                                            return (
                                                <option value={l} key={l}>
                                                    {l}
                                                </option>
                                            );
                                        })}
                                    </Select>
                                </div>

                                <div id="select" className={style.cate}>
                                    <div className="mb-2 block">
                                        <Label htmlFor="level" value="Select your level" />
                                    </div>
                                    <Select
                                        id="level"
                                        required={true}
                                        onChange={(e) => handleSelect(e)}
                                        name="level"
                                        defaultValue="title"
                                
                                    >
                                        <option value="title" disabled name="Choose category">
                                            Level
                                        </option>
                                        {LEVEL.map((l) => {
                                            return (
                                                <option value={l} key={l}>
                                                    {l}
                                                </option>
                                            );
                                        })}
                                    </Select>
                                </div>
                            </div>

                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="image" value="Image" />
                                </div>
                                <TextInput
                                    id="image"
                                    type="text"
                                    onChange={(e) => handleChange(e)}
                                    name="image"
                                    value={input.image}
                                />
                            </div>

                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="duration" value="Duration" />
                                </div>
                                <TextInput
                                    id="duration"
                                    type="number"
                                    onChange={(e) => handleChange(e)}
                                    name="duration"
                                    addon="Horas"
                                    value={input.duration}
                                    className={style.mitadInputs}
                                />
                            </div>

                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="price" value="Price" />
                                </div>
                                <TextInput
                                    id="price"
                                    type="number"
                                    required={true}
                                    addon="US$"
                                    className={style.mitadInputs}
                                    value={input.price}
                                    name="price"
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>

                            <>
                                <Button
                                    gradientDuoTone="purpleToBlue"
                                    className={style.buttonSubmit}
                                    onClick={showModal}
                                    disabled={btnDisabled}
                                    type="submit"
                                >
                                    Editar el curso
                                </Button>


                            </>
                        </div>

{/* 
                        <div className={style.contenedorupload}>
                            <h1>Aqui subirás 2 videos. <br /> Tu <b>Video de introducción</b> y tu video de curso.</h1>
                            <p>El video de introducción debe durar máximo 1 minuto. Trata de resumir el contenido de tu curso en este video</p>
                            <Dropzone
                                className={style.dropzone}
                                onDrop={handleDrop}
                                onChange={e => setImage(e.target.value)}
                                value={video}
                            >

                                {({ getRootProps, getInputProps }) => (
                                    <section>
                                        <div
                                            {...getRootProps({ className: "dropzone" })}
                                            className={style.dropzone}
                                        >
                                            <input {...getInputProps()} />
                                            <span>📁</span>
                                            <p>Carga tu video aqui o click para seleccionar</p>
                                        </div>
                                    </section>
                                )}
                            </Dropzone>
                            {loading ?
                                (
                                    <div className={style.loading}><h3>Cargando video...</h3></div>
                                ) :
                                (<></>
                                )}
                            <div className={style.videos}>
                                {video.linksVideos.length <= 0
                                    ? "Aun no subes tu video..."
                                    : video.linksVideos.map(vid =>
                                        <video controls autoPlay key={vid} height={vid.height / 10} width={vid.width / 10}>
                                            <source src={vid.fileURL} type="video/mp4" />
                                        </video>
                                    )
                                }
                            </div>
                        </div>
 */}

                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditCurso