import styles from "./Card.module.css";
import { Link } from "react-router-dom";
import { Rating } from "flowbite-react";
import corazonlleno from "../../img/IoIosHeart.svg"
import corazonvacio from "../../img/IoIosHeartEmpty.svg"

const Card = ({ title, image, id, rating, name_prof, isFavorite }) => {
  return (
    <Link to={`/course/${id}`} key={id} className={styles.contCard}>
      {isFavorite ? <img src={corazonlleno} alt="fav" className={styles.corazones} /> : <img src={corazonvacio} alt="NOfav" className={styles.corazones} />}
      <div className={styles.card}>
        <div className={styles.imgcard}>
          <img src={image} alt="miniatura" />
        </div>
        <h3>{title}</h3>
        <p>{name_prof}</p>
        <Rating>
          <Rating.Star filled={rating > 0} />
          <Rating.Star filled={rating > 1} />
          <Rating.Star filled={rating > 2} />
          <Rating.Star filled={rating > 3} />
          <Rating.Star filled={rating > 4} />
          <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
            {rating} out of 5
          </p>
        </Rating>
      </div>
    </Link>
  );
};

export default Card;
