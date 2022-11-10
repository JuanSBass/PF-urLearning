import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Label, Select, TextInput, Textarea, Button } from "flowbite-react";
import style from "../Form/Form.module.css";
import {
  getChildCategory,
  postCourse,
  getCategory,
  getCourses,
} from "../../redux/actions";

const SUB_CATEGORY = [
  "math",
  "chemistry",
  "welder",
  "smith",
  "visual",
  "plastic",
];
const LANGUAGE = ["english", "spanish"];
const LEVEL = ["easy", "medium", "advanced"];

const Form = () => {
  const category = useSelector((state) => state.category);
  const subcategory = useSelector((state) => state.subcategory);
  const dispatch = useDispatch();

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
  });

  const [idCategorySelected, setIdCategorySelected] = useState("");

  // const prueba = () => {
  //   console.log(import.meta.env.VITE_API);
  // };

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  const handleChange = (ev) => {
    setInput({
      ...input,
      [ev.target.name]: ev.target.value,
    });
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
      setIdCategorySelected(categorySelected.id);
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
    });
  };

  return (
    <div className={style.contenedorGeneral}>
      <div className={style.contenedorFormulario}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className={style.formulario}>
            <div className={style.izq}>
              <div>¡Comparte al mundo tu conocimiento!</div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="title" value="Title" />
                </div>
                <TextInput
                  id="title"
                  type="text"
                  required={true}
                  onChange={(e) => handleChange(e)}
                  name="title"
                  className={style.mitadInputs}
                />
              </div>
              <div className={style.categoriasJuntas}>
                <div id="select">
                  <div className="mb-2 block">
                    <Label htmlFor="category" value="Select your category" />
                  </div>
                  <Select
                    id="category"
                    required={true}
                    onChange={handleSelect}
                    name="category"
                  >
                    {category.map((c) => {
                      return (
                        <option value={c.id} key={c.id}>
                          {c.name}
                        </option>
                      );
                    })}
                  </Select>
                </div>

                <div id="select">
                  <div className="mb-2 block">
                    <Label
                      htmlFor="subCategory"
                      value="Select your subCategory"
                    />
                  </div>
                  <Select
                    id="subCategory"
                    required={true}
                    onChange={(e) => handleSelect(e)}
                    name="subCategory"
                  >
                    {subcategory.map((c) => {
                      return (
                        <option value={c} key={c}>
                          {c}
                        </option>
                      );
                    })}
                  </Select>
                </div>
              </div>

              <div id="textarea">
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
              </div>
            </div>
            <div className={style.der}>
              <div className={style.categoriasJuntas}>
                <div id="select">
                  <div className="mb-2 block">
                    <Label htmlFor="language" value="Select your language" />
                  </div>
                  <Select
                    id="language"
                    required={true}
                    onChange={(e) => handleSelect(e)}
                    name="language"
                  >
                    {LANGUAGE.map((l) => {
                      return (
                        <option value={l} key={l}>
                          {l}
                        </option>
                      );
                    })}
                  </Select>
                </div>

                <div id="select">
                  <div className="mb-2 block">
                    <Label htmlFor="level" value="Select your level" />
                  </div>
                  <Select
                    id="level"
                    required={true}
                    onChange={(e) => handleSelect(e)}
                    name="level"
                  >
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
                  required={true}
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

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="name_prof" value="Name" />
                </div>
                <TextInput
                  id="name_prof"
                  type="text"
                  required={true}
                  onChange={(e) => handleChange(e)}
                  name="name_prof"
                  className={style.mitadInputs}
                />
              </div>

              <Button
                gradientDuoTone="purpleToBlue"
                type="submit"
                className={style.buttonSubmit}
              >
                Crear el curso
              </Button>
            </div>
          </div>
        </form>
        {/* <Button gradientDuoTone="purpleToBlue" onClick={prueba}>
          Probar
        </Button> */}
      </div>
    </div>
  );
};

export default Form;
