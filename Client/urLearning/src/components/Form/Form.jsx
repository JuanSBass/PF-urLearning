import React from "react";
// import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Label, Select, TextInput, Textarea, Button } from "flowbite-react";
import style from "../Form/Form.module.css";
import { postCourse } from "../../redux/actions";

const CATEGORY = ["science", "trades", "arts"];
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
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    title: "",
    image: "",
    category: [],
    subcategory: [],
    duration: "",
    description: "",
    language: [],
    price: "",
    level: [],
  });

  const handleChange = (ev) => {
    setInput({
      ...input,
      [ev.target.name]: ev.target.value.toLowerCase(),
    });
  };

  const handleSelect = (ev) => {
    if (!input.category.includes(ev.target.value)) {
      setInput({
        ...input,
        category: [...input.category, ev.target.value],
      });
    }
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    dispatch(postCourse(input));
    setInput({
      title: "",
      image: "",
      category: [],
      subcategory: [],
      duration: "",
      description: "",
      language: [],
      price: "",
      level: [],
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
                    onChange={(e) => handleSelect(e)}
                  >
                    {CATEGORY.map((c) => {
                      return (
                        <option value={c} key={c}>
                          {c}
                        </option>
                      );
                    })}
                  </Select>
                </div>

                <div id="select">
                  <div className="mb-2 block">
                    <Label
                      htmlFor="subcategory"
                      value="Select your subcategory"
                    />
                  </div>
                  <Select
                    id="subcategory"
                    required={true}
                    onChange={(e) => handleSelect(e)}
                  >
                    {SUB_CATEGORY.map((c) => {
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
                  required={true}
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
                  required={true}
                  addon="US$"
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
      </div>
    </div>
  );
};

export default Form;
