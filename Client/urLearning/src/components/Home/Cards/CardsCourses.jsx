import styles from "./CardsCourses.module.css";
import peiton from "../../../img/Rectangle 15.png";
import { Link } from "react-router-dom";

const CardsCourses = () => {
  return (
    <section className={styles.cardscontainer}>
      {pruebaData.map((card) => (
        <Link to={`/course/${card.id}`}>
          <div className={styles.card} key={card.teacher}>
            <img src={peiton} alt="miniatura" />
            <h3>{card.title}</h3>
            <p>{card.teacher}</p>
            <p>⭐{card.rating}/5</p>
          </div>
        </Link>
      ))}
    </section>
  );
};

export default CardsCourses;

const pruebaData = [
  {
    id: 1,
    title: "Aprende programación en Phyton",
    teacher: "Juancito Santillán",
    rating: 4,
  },
  {
    id: 2,
    title: "Aprende clases de guitarra",
    teacher: "Cesar Restrepo",
    rating: 4,
  },
  {
    id: 3,
    title: "Aprende programación en Phyton",
    teacher: "Gaston Resoagli",
    rating: 4,
  },
  {
    id: 4,
    title: "Aprende programación en Phyton",
    teacher: "Lucas Canaparo",
    rating: 4,
  },
  {
    id: 5,
    title: "Aprende programación en Phyton",
    teacher: "Santiago Restrepo",
    rating: 4,
  },
  {
    id: 6,
    title: "Aprende programación en Phyton",
    teacher: "Marco Giabbani",
    rating: 4,
  },
  {
    id: 7,
    title: "Aprende programación en Phyton",
    teacher: "Valen",
    rating: 4,
  },
  {
    id:8,
    title: "Aprende programación en Phyton",
    teacher: "Lupil López Pepa",
    rating: 4,
  },
];
