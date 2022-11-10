import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourses } from "../../redux/actions";
import styles from "./Home.module.css";
import { HeaderHome } from "./Header/HeaderHome";
import CardsCourses from "./Cards/CardsCourses";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { InfoService } from "./InfoService/InfoService";

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
			<Link to="/allcourses">
				<Button id={styles.toallcourses} gradientDuoTone="greenToBlue">
					Ver más cursos
					<svg
						aria-hidden="true"
						className="ml-2 -mr-1 w-5 h-5"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg">
						<path
							fillRule="evenodd"
							d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
							clipRule="evenodd"></path>
					</svg>
				</Button>
			</Link>
			<InfoService />
		</main>
	);
};
export default Home;
