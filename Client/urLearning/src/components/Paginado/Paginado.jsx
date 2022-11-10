import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import Card from "./Card";
// import { setCurrentPage } from "../actions";

// const renderData = (data) => {
//   return data.map((p) => {
//     return (
//       <Card
//         name={p.name}
//         image={p.image}
//         types={p.types}
//         key={p.id}
//         id={p.id}
//       />
//     );
//   });
// };

function Paginado() {
  const dispatch = useDispatch();

  const allCourses = useSelector((state) => state.courses);

  //   const currentPage = useSelector((state) => state.currentPage);

  const [cardsPerPage] = useState(9);

  const handleClick = (ev) => {
    dispatch(setCurrentPage(Number(ev.target.id)));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(allCourses.length / cardsPerPage); i++) {
    // divido mi cantidad de pokemones por la cantidad de pokemones que quiero por pagina
    pages.push(i);
  }

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = allPokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

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
        {allPokemons.length ? (
          renderData(currentPokemons)
        ) : (
          <div>
            <img src={pokeball} alt="pokeball" className={styles.pokeball} />
          </div>
        )}
      </div>

      <div>
        <ul className={styles.pageNumbers}>
          <li>
            <button onClick={handlePrev}>
              <img src={izq} alt="izq" className={styles.chevIzq}></img>
            </button>
          </li>

          {pageNumbers}

          <li>
            <button onClick={handleNext}>
              <img src={der} alt="der" className={styles.chevDer}></img>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Paginado;
