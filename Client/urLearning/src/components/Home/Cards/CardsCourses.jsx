import styles from "./CardsCourses.module.css";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Rating } from "flowbite-react";
import { useState } from "react";
import { addRemoveFavorite, postProductCart } from "../../../redux/actions";
import corazonlleno from "../../../img/IoIosHeart.svg"
import corazonvacio from "../../../img/IoIosHeartEmpty.svg"
import { Toaster, toast } from 'react-hot-toast';


const CardsCourses = () => {
  const courses = useSelector((state) => state.courses).slice(0, 8);
  const [input, setInput] = useState({
    title: "",
    price: ""
  })
  const user = useSelector(state => state.user)
  const cart = useSelector(state => state.carrito)
  // console.log(user);
  const navigate = useHistory();

  const userTokken = window.localStorage.getItem("tokken");
  // console.log(userTokken);

  const dispatch = useDispatch()


  const favoritos = useSelector((state) => state.favorites);
  const cursosComprados = useSelector(state => state.userCourses)

  const handleClick = (card) => {
    if (!user.name) return navigate.push("/register")
    const cardId = card?.id
    const courseExits = cart.filter((e) => {
      return (e?.id === cardId)
    })?.length > 0
    if (courseExits) {
      toast.error('Course exits!')
      return
    }
    dispatch(postProductCart(card, userTokken))
    toast.success('Added Course!')
  }

  const handleFav = (e) => {
    dispatch(addRemoveFavorite(userTokken, e))

  }
  return (
    <section className={styles.cardscontainer}>
      {courses?.map((card) => {
        const isFavorite = favoritos?.some(e => e.id === card.id)
        return (
          <div className={styles.card} key={card.id}>
            <button onClick={() => handleFav(card.id)}> {isFavorite ? <img src={corazonlleno} alt="fav" className={styles.corazones} /> : <img src={corazonvacio} alt="NOfav" className={styles.corazones} />}</button>
            {/* {isFavorite ? <button onClick={() => handleFav(card.id)}><img src={corazonlleno} alt="fav" className={styles.corazones} /></button> : <button onClick={() => handleFav(card.id)}> <img src={corazonvacio} alt="NOfav" className={styles.corazones} /></button>} */}
            <Link to={`/course/${card.id}`} key={card.id}>
              <div className={styles.imgcard}>
                <img className="img" src={card.image} alt="miniatura" />
              </div>
            </Link>
            <h3>{card.title}</h3>
            <p>{card.name_prof}</p>
            <h2>${card.price} USD</h2>

            <Rating>
              <Rating.Star filled={card.ratingHistory > 0} />
              <Rating.Star filled={card.ratingHistory > 1} />
              <Rating.Star filled={card.ratingHistory > 2} />
              <Rating.Star filled={card.ratingHistory > 3} />
              <Rating.Star filled={card.ratingHistory > 4} />
              <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                {card.ratingHistory} out of 5
              </p>
            </Rating>

            <button type="button" class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-1 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900" onClick={() => handleClick(card)} >Add to Cart</button>
            <Toaster
              position="bottom-right"
            />
          </div>

        )
      })}
    </section >
  );
};



export default CardsCourses;