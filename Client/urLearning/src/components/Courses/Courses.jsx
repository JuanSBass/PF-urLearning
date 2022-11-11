import styles from "./Courses.module.css";
import CardsCourses from "../Home/Cards/CardsCourses";

const Courses = () => {
  return (
    <main className={styles.coursescontainer}>
      <section className={styles.sidebar}></section>
      <CardsCourses />
    </main>
  );
};

export default Courses;
