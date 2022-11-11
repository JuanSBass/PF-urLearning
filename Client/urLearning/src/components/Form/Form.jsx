import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Label,
  Select,
  TextInput,
  Textarea,
  Button,
  Badge,
  Modal,
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
  });

  let btnDisabled = !(
    input.title.length &&
    input.image.length &&
    input.category.length &&
    input.subCategory.length &&
    input.duration.length &&
    input.language.length &&
    input.price.length &&
    input.level.length
  );

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
    });
    history.push("/");
    dispatch(getCourses());
  };

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
                </div>

                {/* <Badge color="info" size="sm" className={style.tag}>
                  {input.category}
                </Badge> */}

                <div id="select" className={style.cate}>
                  <div className="mb-2 block">
                    <Label htmlFor="subCategory" value="Subcategory" />
                  </div>
                  <Select
                    id="subCategory"
                    required={true}
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
                    required={true}
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

                <Modal show={modal} size="md" popup={true} onClose={showModal}>
                  <Modal.Header />
                  <Modal.Body>
                    <div className="text-center">
                      <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        Curso creado con exito!
                      </h3>
                      {/* <div className="flex justify-center gap-4">
                        <Button
                          onClick={showModal}
                          type="submit"
                          className={style.btnYes}
                        >
                          Yes, I'm sure
                        </Button>
                        <Button color="gray" onClick={showModal}>
                          No, cancel
                        </Button>
                      </div> */}
                    </div>
                  </Modal.Body>
                </Modal>
              </>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
