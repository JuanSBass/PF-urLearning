import react from "react";
import Searchbar from "../searchBar/SearchBar";

export default function Footer() {
	return (
		<footer class="p-4 bg-white rounded-lg shadow align-self: flex-end md:flex sticky top-2 fixed w-full md:items-center md:justify-between md:p-6 dark:bg-gray-800">
			<span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
				© 2022{" "}
				<a href="https://flowbite.com/" class="hover:underline">
					UrLearning™
				</a>
				. All Rights Reserved.
			</span>
			<ul class="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
				<li>
					<a
						href="#"
						class="mr-4 md:mr-6 block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
						About
					</a>
				</li>
				<li>
					<a
						href="#"
						class="mr-4 md:mr-6 block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
						Licensing
					</a>
				</li>
				<li>
					<a
						href="#"
						class="mr-4 md:mr-6 block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
						Contact
					</a>
				</li>
			</ul>
		</footer>
	);
}



