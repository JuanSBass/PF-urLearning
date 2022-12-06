import styles from "./Card.module.css";
import { Link } from "react-router-dom";
import { Rating } from "flowbite-react";
import corazonlleno from "../../img/IoIosHeart.svg"
import corazonvacio from "../../img/IoIosHeartEmpty.svg"
import { addRemoveFavorite } from "../../redux/actions";
import { useDispatch } from "react-redux";

const Card = ({ title, image, id, ratingHistory, name_prof, isFavorite, price }) => {
  const dispatch = useDispatch()
  const userTokken = window.localStorage.getItem("tokken");

  const handleFav = (e) => {
    dispatch(addRemoveFavorite(userTokken, e))

  }
  return (
    <div className={styles.contCard}>

      <button onClick={() => handleFav(id)}> {isFavorite ? <img src={corazonlleno} alt="fav" className={styles.corazones} /> : <img src={corazonvacio} alt="NOfav" className={styles.corazones} />}</button>
      <div className={styles.card}>
        <Link to={`/course/${id}`} key={id}>
          <div className={styles.imgcard}>
            <img src={image} alt="miniatura" />
          </div>
        </Link>
        <h3>{title}</h3>
        <p>{name_prof}</p>
        <>
        { price === "0" ? (<h2>GRATIS 🎁</h2>) : (<h2>${price} USD</h2> }
        </>
        <Rating>
          <Rating.Star filled={ratingHistory > 0} />
          <Rating.Star filled={ratingHistory > 1} />
          <Rating.Star filled={ratingHistory > 2} />
          <Rating.Star filled={ratingHistory > 3} />
          <Rating.Star filled={ratingHistory > 4} />
          <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
            {ratingHistory} out of 5
          </p>
        </Rating>
      </div>
    </div>
  );
};

export default Card;
