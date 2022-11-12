import styles from "./Courses.module.css";
import Paginado from "../Paginado/Paginado";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filteredByCategories,
  filteredBySubCategories,
  getCategory,
  getChildCategory,
  getCourses,
} from "../../redux/actions";
import { Button, Select } from "flowbite-react";
import { Link } from "react-router-dom";
import Searchbar from "../searchBar/SearchBar";


const Courses = () => {
  const dispatch = useDispatch();
  const [orden, setOrden] = useState("");
  const [cursesFiltered, setCursesFilteres] = useState([]);
  const categories = useSelector((state) => state.category);
  // let categoriesName = [];
  // categories.map((cat) => categoriesName.push(cat.name));
  // let catSet = [...new Set(categoriesName)];

  const subCategories = useSelector((state) => state.subCategories);

  useEffect(() => {
    dispatch(getCourses());
    dispatch(getCategory());
  }, [dispatch]);

  const filterCategos = (event) => {
    // setCurrentPage(1);
    dispatch(filteredByCategories(event.target.value));
    let categorySelected = categories.find(
      (c) => c.name === event.target.value
    );
    dispatch(getChildCategory(categorySelected.id));
  };

  const filterSubCategos = (event) => {
    // setCurrentPage(1);
    dispatch(filteredBySubCategories(event.target.value));
  };

  // const arrIds = [];
  // console.log(arrIds);
  // const handleOrder = (event) => {
  //   event.preventDefault();
  //   // setCurrentPage(1);
  //   dispatch(orderByName(event.target.value));
  //   setOrden(`Ordenado ${event.target.value}`);
  // };
  return (
    <main className={styles.coursescontainer}>
      <section className={styles.filterscontainer}>
        <select onChange={filterCategos}>
          <option value="All">Todas</option>
          {categories.map(({ name, id }) => {
            // arrIds.push(id);
            return (
              <option value={name} id={id}>
                {name}
              </option>
            );
          })}
        </select>
        <Select id="subCategory" onChange={filterSubCategos} name="subCategory">
          {/* <option value="All">Todas</option> */}
          <option value=""></option>
          {subCategories?.map((c) => {
            return (
              <option value={c.name} key={c.id}>
                {c.name}
              </option>
            );
          })}
        </Select>
        {/* <select onChange={handleOrder}>
          <option value="all">Todos</option>
          <option value="asc">Alfabético A-Z</option>
          <option value="des">Alfabético Z-A</option>
          <option value="populationMayor">Población + -</option>
          <option value="populationMenor">Población - +</option>
        </select> */}
        <Link to="/form">
          <Button gradientMonochrome="success">Crear curso</Button>
        </Link>
      </section>
      <Paginado />
      <Searchbar />
    </main>
  );
};

export default Courses;

//order rating, precio,
//filtro categoria, subCategory e idioma
