import girl from "../../../img/medium-shot-woman-recording-herself 1.png"
import styles from "./HeaderHome.module.css"

export const HeaderHome = () => {
  return (
    <section className={styles.headercontainer}>
        <div className={styles.sideleft}>
            <h1 className={styles.up}>La mejor forma de aprender y enseñar</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident inventore magni doloribus distinctio expedita natus exercitationem rerum libero. Nostrum veritatis eos error asperiores a deserunt sunt architecto voluptatem fugiat et.</p>
        </div>
        <div className={styles.sideright}>
            <img src={girl} alt="girl" />
        </div>
    </section>
  )
}
