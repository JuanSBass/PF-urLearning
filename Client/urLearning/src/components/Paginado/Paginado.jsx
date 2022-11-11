import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentPage } from "../../redux/actions";
import styles from "../Paginado/Paginado.module.css";
import Card from "./Card";
import { Spinner } from "flowbite-react";

const renderData = (data) => {
  return data.map((p) => {
    return (
      <Card
        image={p.image}
        title={p.title}
        name_prof={p.name_prof}
        key={p.id}
        id={p.id}
        rating={p.rating}
      />
    );
  });
};

function Paginado() {
  const dispatch = useDispatch();

  const allCourses = useSelector((state) => state.courses);

  const currentPage = useSelector((state) => state.currentPage);

  const [cardsPerPage] = useState(9);

  const handleClick = (ev) => {
    dispatch(setCurrentPage(Number(ev.target.id)));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(allCourses.length / cardsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = allCourses.slice(indexOfFirstCard, indexOfLastCard);

  const pageNumbers = pages.map((numbers) => {
    return (
      <li
        key={numbers}
        id={numbers}
        onClick={handleClick}
        className={currentPage === numbers ? styles.active : null}
      >
        {numbers}
      </li>
    );
  });

  const handleNext = () => {
    if (currentPage + 1 <= pages.length) {
      dispatch(setCurrentPage(currentPage + 1));
    } else {
      return null;
    }
  };

  const handlePrev = () => {
    if (currentPage - 1 >= 1) {
      dispatch(setCurrentPage(currentPage - 1));
    } else {
      return null;
    }
  };

  return (
    <>
      <div className={styles.contCards}>
        {allCourses.length ? (
          renderData(currentCards)
        ) : (
          <Spinner aria-label="Default status example" />
        )}
      </div>

      <div>
        <ul className={styles.pageNumbers}>
          <li>
            <button onClick={handlePrev}>izq</button>
          </li>

          {pageNumbers}

          <li>
            <button onClick={handleNext}>der</button>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Paginado;
