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
import { Button, Select, Dropdown, Rating, Label, Toast } from "flowbite-react";
import { HiExclamation } from "react-icons/hi";
import { Link } from "react-router-dom";
import Searchbar from "../searchBar/SearchBar";
import Error404 from "../404/Error404";

const Courses = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category);
  const [order, setOrder] = useState("");
  const subCategories = useSelector((state) => state.subCategories);
  const courses = useSelector((state) => state.courses);
  const user = useSelector(state => state.user);

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
  };
  const handleOrderDos = () => {
    dispatch(orderByAny("2"))
  };
  const handleOrderTres = () => {
    dispatch(orderByAny("3"))
  };
  const handleOrderCuatro = () => {
    dispatch(orderByAny("4"))
  };
  const handleOrderCinco = () => {
    dispatch(orderByAny("5"))
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
        <Label>Categorías</Label>
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
        <Label>Subcategorías</Label>
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

        <Label>Ordenamiento</Label>
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

        <div id="containerbutontoast">
          <Link to={user.name && "/form"}>
            <Button gradientMonochrome="success" disabled={!user.name}
            >Crear curso</Button>
          </Link>
          {!user.name && <Toast id={styles.toast}>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
              <HiExclamation className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">
              Accede o crea una cuenta para crear
            </div>
            <Toast.Toggle />
          </Toast>}
        </div>

      </section>

      {
        courses.length ? (<Paginado />) : (<Error404 />)
      }


    </main>
  );
};

export default Courses;
// arreglando pre-main