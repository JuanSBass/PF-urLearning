import styles from "./CardsCourses.module.css"
import peiton from "../../../img/Rectangle 15.png"

const CardsCourses = () => {
  return (
    <section className={styles.cardscontainer}>
      {
        pruebaData.map(card => (
          <div className={styles.card} key={card.teacher}>
            <img src={peiton} alt="miniatura"/>
            <h3>{card.title}</h3>
            <p>{card.teacher}</p>
            <p>⭐{card.rating}/5</p>
          </div>
        ))
      }
    </section>
  )
}

export default CardsCourses


const pruebaData = [
  {
    title: "Aprende programación en Phyton",
    teacher: "Juancito Santillán",
    rating: 4
  },
    {
    title: "Aprende clases de guitarra",
    teacher: "Cesar Restrepo",
    rating: 4
  },  {
    title: "Aprende programación en Phyton",
    teacher: "Gaston Resoagli",
    rating: 4
  },  {
    title: "Aprende programación en Phyton",
    teacher: "Lucas Canaparo",
    rating: 4
  },  {
    title: "Aprende programación en Phyton",
    teacher: "Santiago Restrepo",
    rating: 4
  },  {
    title: "Aprende programación en Phyton",
    teacher: "Marco Giabbani",
    rating: 4
  },  {
    title: "Aprende programación en Phyton",
    teacher: "Valen",
    rating: 4
  },  {
    title: "Aprende programación en Phyton",
    teacher: "Lupil López Pepa",
    rating: 4
  },
]