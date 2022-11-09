import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourses } from "../../redux/actions";
import styles from "./Home.module.css";
import { HeaderHome } from "./Header/HeaderHome";
import CardsCourses from "./Cards/CardsCourses";

const Home = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  const courses = useSelector((state) => state.courses);
  console.log(courses);
  return (
    <main className={styles}>
      <HeaderHome />
      <h1>¡Mira todos los cursos disponibles para vos!</h1>
      <CardsCourses />
    </main>
  );
};
export default Home;
