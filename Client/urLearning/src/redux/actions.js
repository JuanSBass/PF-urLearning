import axios from "axios";
export const GET_COURSES = "GET_COURSES";
export const POST_COURSE = "POST_COURSE";
export const GET_COURSES_BY_NAME = "GET_COURSES_BY_NAME";

export const getCourses = () => {
	try {
		return async function (dispatch) {
			const response = await axios.get("/user");
			console.log(response);
			dispatch({ type: GET_COURSES, payload: response.data });
		};
	} catch (error) {
		console.log(error.message);
	}
};

export function postCourse(dataCourse) {
	return async function () {
		const json = await axios.post("/course", dataCourse);
		return json;
	};
}

export default function getCoursesByName(title) {
	return async function (dispatch) {
		try {
			var json = await axios.get("/course?name=" + title.charAt(0).toUpperCase() + title.slice(1));
			return dispatch({
				type: "GET_COURSES_BY_NAME",
				payload: json.data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}
