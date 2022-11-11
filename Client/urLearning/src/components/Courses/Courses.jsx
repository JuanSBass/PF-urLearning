import styles from "./Courses.module.css";
import CardsCourses from "../Home/Cards/CardsCourses";
import Paginado from "../Paginado/Paginado";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCourses } from "../../redux/actions";

const Courses = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);
  return (
    <main className={styles.coursescontainer}>
      <section className={styles.sidebar}></section>
      {/* <CardsCourses /> */}
      <Paginado></Paginado>
    </main>
  );
};

export default Courses;
