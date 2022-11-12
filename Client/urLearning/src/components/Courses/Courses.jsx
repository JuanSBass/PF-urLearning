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
  orderByAny,
} from "../../redux/actions";
import { Button, Select, Dropdown, Rating } from "flowbite-react";
import { Link } from "react-router-dom";
import Searchbar from "../searchBar/SearchBar";

const Courses = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category);
  const [order, setOrder] = useState("");
  const subCategories = useSelector((state) => state.subCategories);

  useEffect(() => {
    dispatch(getCourses());
    dispatch(getCategory());
  }, [dispatch]);

  const filterCategos = (event) => {
    dispatch(filteredByCategories(event.target.value));
    let categorySelected = categories.find(
      (c) => c.name === event.target.value
    );

    dispatch(getChildCategory(categorySelected.id));
  };

  const filterSubCategos = (event) => {
    dispatch(filteredBySubCategories(event.target.value));
  };

  const ordering = (event) => {
    event.preventDefault();
    dispatch(orderByAny(event.target.value))
    setOrder(event.target.value)
  }

  const handleOrderUno = () => {
    dispatch(orderByAny("1"));
    console.log("aqui apretó uno");
  };
  const handleOrderDos = () => {
    dispatch(orderByAny("2"))
    console.log("aqui apretó dos");
  };
  const handleOrderTres = () => {
    dispatch(orderByAny("3"))
    console.log("aqui apretó tres");
  };
  const handleOrderCuatro = () => {
    dispatch(orderByAny("4"))
    console.log("aqui apretó cuatro");
  };
  const handleOrderCinco = () => {
    dispatch(orderByAny("5"))
    console.log("aqui apretó cinco");
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
        <Searchbar />
        <Select onChange={filterCategos}>
          <option value="All">Todas</option>
          {categories?.map(({ name, id }) => {
            // arrIds.push(id);
            return (
              <option value={name} id={id} key={id}>
                {name}
              </option>
            );
          })}
        </Select>
        <Select id="subCategory" onChange={filterSubCategos} name="subCategory">
          {/* <option value="All">Todas</option> */}
          <option value="">-</option>
          {subCategories?.map((c) => {
            return (
              <option value={c.name} key={c.id}>
                {c.name}
              </option>
            );
          })}
        </Select>
        <Dropdown
          label="Rating"
          inline={true}
        >
          <Dropdown.Item onClick={handleOrderCinco} >
            <Rating >
              <Rating.Star />
              <Rating.Star />
              <Rating.Star />
              <Rating.Star />
              <Rating.Star />
            </Rating>
          </Dropdown.Item>
          <Dropdown.Item onClick={handleOrderCuatro} >
            <Rating>
              <Rating.Star />
              <Rating.Star />
              <Rating.Star />
              <Rating.Star />
              <Rating.Star filled={false} />
            </Rating>
          </Dropdown.Item>
          <Dropdown.Item onClick={handleOrderTres}>
            <Rating>
              <Rating.Star />
              <Rating.Star />
              <Rating.Star />
              <Rating.Star filled={false} />
              <Rating.Star filled={false} />
            </Rating>
          </Dropdown.Item>
          <Dropdown.Item onClick={handleOrderDos}>
            <Rating>
              <Rating.Star />
              <Rating.Star />
              <Rating.Star filled={false} />
              <Rating.Star filled={false} />
              <Rating.Star filled={false} />
            </Rating>
          </Dropdown.Item>
          <Dropdown.Item onClick={handleOrderUno}>
            <Rating>
              <Rating.Star />
              <Rating.Star filled={false} />
              <Rating.Star filled={false} />
              <Rating.Star filled={false} />
              <Rating.Star filled={false} />
            </Rating>
          </Dropdown.Item>
        </Dropdown>

        <Select
          id="orders"
          onChange={ordering}
          name="orders"
        >
          <option value="">-</option>
          <option value="price+">Mayor precio</option>
          <option value="price-">Menor precio</option>
          <option value="rating+">Mejores calificados</option>
          <option value="rating-">Menor calificación</option>

        </Select>

        <Link to="/form">
          <Button gradientMonochrome="success">Crear curso</Button>
        </Link>
      </section>
      <Paginado />
    </main>
  );
};

export default Courses;
// arreglando pre-main