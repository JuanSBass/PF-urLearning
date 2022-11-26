import React from "react";
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
  Spinner
} from "flowbite-react";
import style from "../Form/Form.module.css";
import {
  getChildCategory,
  postCourse,
  getCategory,
  getCourses,
} from "../../redux/actions";
import { useHistory } from "react-router-dom";

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

  if (!input.category) {
    errors.category = "Debe ingresar una categoría";
  }


  return errors;
}

const Form = () => {
  const category = useSelector((state) => state.category);
  const subCategories = useSelector((state) => state.subCategories);
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const showModal = () => {
    setModal(!modal);
  };

  const [input, setInput] = useState({
    title: "",
    image: "",
    category: "",
    subCategory: "",
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
    input.title.length &&
    input.category.length &&
    input.description.length &&
    input.price.length &&
    input.level.length &&
    input.name_prof.length &&
    input.subCategory.length &&
    input.language.length &&
    input.videos?.linksVideos?.length === 2
  ) ||
    input.description.length > 200 ||
    input.description.length < 15

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

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
    dispatch(postCourse(input));
    setInput({
      title: "",
      image: "",
      category: "",
      subCategory: "",
      duration: "",
      description: "",
      language: "",
      price: "",
      level: "",
      name_prof: "",
      videos: []
    });
    history.push("/");
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

  console.log(input);


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
                    onChange={(e) => handleChange(e)}
                    name="name_prof"
                  />
                  {errors.name_prof && (
                    <div className={style.errores}>{errors.name_prof}</div>
                  )}
                </div>
              </div>
              <div className={style.categoriasJuntas}>
                <div id="select" className={style.cate}>
                  <div className="mb-2 block">
                    <Label htmlFor="category" value="Select your category" />
                  </div>

                  <Select
                    id="category"
                    required={true}
                    onChange={handleSelect}
                    name="category"
                    defaultValue="title"
                  >
                    <option value="title" disabled name="Choose category">
                      Category
                    </option>
                    {category.map((c) => {
                      return (
                        <option value={c.id} key={c.id}>
                          {c.name}
                        </option>
                      );
                    })}
                  </Select>
                  {errors.category && (
                    <div className={style.errores}>{errors.category}</div>
                  )}
                </div>



                <div id="select" className={style.cate}>
                  <div className="mb-2 block">
                    <Label htmlFor="subCategory" value="Subcategory" />
                  </div>
                  <Select
                    id="subCategory"
                    onChange={(e) => handleSelect(e)}
                    name="subCategory"
                    defaultValue="title"
                  >
                    <option value="title" disabled name="Choose category">
                      Subcategory
                    </option>
                    {subCategories?.map((c) => {
                      return (
                        <option value={c.name} key={c.id}>
                          {c.name}
                        </option>
                      );
                    })}
                  </Select>
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
                  onChange={(e) => handleChange(e)}
                  name="description"
                />
                {errors.description && (
                  <div className={style.errores}>{errors.description}</div>
                )}
              </div>
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
                  Crear el curso
                </Button>


              </>
            </div>


            <div className={style.contenedorupload}>
              <h1>Aqui subirás 2 videos. <br /> Tu <b>Video de introducción</b> y tu video de curso.</h1>
              <p>El video de introducción debe durar máximo 1 minuto. Trata de resumir el contenido de tu curso en este video</p>
              <Dropzone
                className={style.dropzone}
                onDrop={handleDrop}
                onChange={e => setImage(e.target.value)}
                value={video}
                disabled={input.videos.linksVideos?.length >= 2}
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
                  <Button color="gray">
                    <Spinner aria-label="Alternate spinner button example" />
                    <span className="pl-3">
                      Cargando...
                    </span>
                  </Button>
                ) :
                (<></>
                )}
              <div className={style.videos}>
                {video.linksVideos.length <= 0
                  ? "Aun no subes tus videos..."
                  : video.linksVideos.map(vid => {
                    if (vid.height > vid.width)
                      return (<video controls autoPlay key={vid.fileURL} height="385" width="220">
                        <source src={vid.fileURL} type="video/mp4" />
                      </video>)
                    if (vid.height < vid.width)
                      return (<video controls autoPlay key={vid.fileURL} height="300" width="350">
                        <source src={vid.fileURL} type="video/mp4" />
                      </video>)
                  }

                  )
                }
              </div>
            </div>


          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
