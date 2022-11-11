import styles from "./Courses.module.css";
import Paginado from "../Paginado/Paginado";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filteredByCategories,
  getCategory,
  getCourses,
} from "../../redux/actions";

const Courses = () => {
  const dispatch = useDispatch();
  const [orden, setOrden] = useState("");
  const categories = useSelector((state) => state.category);
  let categoriesName = [];
  categories.map((cat) => categoriesName.push(cat.name));
  let catSet = [...new Set(categoriesName)];

  useEffect(() => {
    dispatch(getCourses());
    dispatch(getCategory());
  }, [dispatch]);

  const filterCategos = (event) => {
    // setCurrentPage(1);
    dispatch(filteredByCategories(event.target.value));
  };
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
          {catSet.map((category) => {
            return <option value={category}>{category}</option>;
          })}
        </select>

        {/* <select onChange={handleOrder}>
          <option value="all">Todos</option>
          <option value="asc">Alfabético A-Z</option>
          <option value="des">Alfabético Z-A</option>
          <option value="populationMayor">Población + -</option>
          <option value="populationMenor">Población - +</option>
        </select> */}
      </section>
      <Paginado />
    </main>
  );
};

export default Courses;

//order rating, precio,
//filtro categoria, subCategory e idioma
