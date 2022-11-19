import styles from "./CardsCourses.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Rating } from "flowbite-react";
<<<<<<< HEAD
import 'flowbite';

const CardsCourses = () => {
  const courses = useSelector((state) => state.courses).slice(0, 8);
=======
import { useState } from "react";
import { addToCart, postProductCart } from "../../../redux/actions";


const CardsCourses = () => {
  const courses = useSelector((state) => state.courses).slice(0, 8);
  const [input, setInput] = useState({
    title: "",
    price: ""
  })

  const userTokken = window.localStorage.getItem("tokken");
  console.log(userTokken);

  const dispatch = useDispatch()
  const handleClick = (id) => {
    dispatch(postProductCart(id, userTokken))
  }
>>>>>>> lucas

  return (
    <section className={styles.cardscontainer}>
      {courses?.map((card) => (
<<<<<<< HEAD
        <Link to={`/course/${card.id}`} key={card.id}>
          <div className={styles.card}>
            <div className={styles.imgcard}>
              <img src={card.image} alt="miniatura" />
            </div>
            <h3>{card.title}</h3>
            <p>{card.name_prof}</p>
            <Rating>
              <Rating.Star filled={card.rating > 0} />
              <Rating.Star filled={card.rating > 1} />
              <Rating.Star filled={card.rating > 2} />
              <Rating.Star filled={card.rating > 3} />
              <Rating.Star filled={card.rating > 4} />
              <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                {card.rating} out of 5
              </p>
            </Rating>
          </div>
        </Link>
=======
        <div className={styles.card}>
          <Link to={`/course/${card.id}`} key={card.id}>
            <div className={styles.imgcard}>
              <img src={card.image} alt="miniatura" />
            </div>
          </Link>
          <h3>{card.title}</h3>
          <p>{card.name_prof}</p>
          <Rating>
            <Rating.Star filled={card.rating > 0} />
            <Rating.Star filled={card.rating > 1} />
            <Rating.Star filled={card.rating > 2} />
            <Rating.Star filled={card.rating > 3} />
            <Rating.Star filled={card.rating > 4} />
            <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
              {card.rating} out of 5
            </p>
          </Rating>
          <button onClick={() => handleClick(card)}>ADD</button>
        </div>
>>>>>>> lucas
      ))}
    </section>
  );
};

export default CardsCourses;
