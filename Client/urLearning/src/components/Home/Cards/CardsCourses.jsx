import styles from "./CardsCourses.module.css";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Rating } from "flowbite-react";
import { useState } from "react";
import { postProductCart } from "../../../redux/actions";
import { Toaster, toast } from 'react-hot-toast';


const CardsCourses = () => {
  const courses = useSelector((state) => state.courses).slice(0, 8);
  const [input, setInput] = useState({
    title: "",
    price: ""
  })
  const user = useSelector(state => state.user)
  // console.log(user);
  const navigate = useHistory();

  const userTokken = window.localStorage.getItem("tokken");
  // console.log(userTokken);

  const dispatch = useDispatch()
  const handleClick = (id) => {
    if (!user.name) return navigate.push("/register")
    dispatch(postProductCart(id, userTokken))
    toast.success('Added Course!')
  }

  return (
    <section className={styles.cardscontainer}>
      {courses?.map((card) => (
        <div className={styles.card} key={card.id}>
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
          <button type="button" class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-1 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900" onClick={() => handleClick(card)}>Add to Cart</button>
          <Toaster
            position="bottom-right"
          />
        </div>

      ))}
    </section>
  );
};

export default CardsCourses;