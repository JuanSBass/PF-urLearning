import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getCoursesByname } from "../../redux/actions"
import style from "./SearchBar.module.css"

export default function Searchbar() {

	const dispatch = useDispatch();
	const [name, setName] = useState("")

	console.log(name)

	const handleInput = (ev) => {
		setName(ev.target.value)
	};

	const handleSubmit = (ev) => {
		ev.preventDefault();
		dispatch(getCoursesByname(name));
		setName("");
	}


	return (
		<div id={style.searchcontainer}>
			<form >
				<label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
				<div class="relative">
					<div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
						<svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
					</div>
					<input
						onChange={(ev) => handleInput(ev)}
						value={name}
						type="text"
						id={style.input}
						autoComplete="off"
						class="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="Search..."
						required="" />
				</div>
			</form>
			<button
				onClick={(ev) => handleSubmit(ev)}
				type="submit"
				class="text-white right-2.5 bottom-2.5 bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
			>Search</button>
		</div>

	);
}

