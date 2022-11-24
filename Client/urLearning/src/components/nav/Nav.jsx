import React from "react";
import logo from "../img/Logo.png";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Dropdown, Avatar } from "flowbite-react"
import { logOut } from "../../redux/actions";
// import ShoppingCart from "../Shopping/ShoppingCart";


export default function Nav() {
	const dispatch = useDispatch();
	const user = useSelector(state => state.user);
	const navigate = useHistory();
	const handleLogOut = () => {
		if(user.name) navigate.push("/");
		dispatch(logOut())
	}
	
	const log = useSelector(state => state.log);
	return (
		//Navbar logo
		<nav class="bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
			<div class="container flex flex-wrap justify-between items-center mx-auto">
				<Link to="/">
					<img src={logo} class="mr-3 h-6 sm:h-9" alt="Logo" />
					<span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"></span>
				</Link>

				<div class="flex md:order-2 md:space-x-9">
					<Link to={!user.name ? "/register" : "/shop"}><button type="button" class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-3 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg> </button> </Link>
					{log ? <Dropdown
						label={<Avatar alt="User settings" img={user.image} rounded={true} />}
						arrowIcon={false}
						inline={true}
					>
						<Dropdown.Header>
							<span className="block text-sm">
								{user.name}
							</span>
							<span className="block truncate text-sm font-medium">
								{user.email}
							</span>
						</Dropdown.Header>
						<Link to={`/${user.name}`}>
							<Dropdown.Item>
								Dashboard
							</Dropdown.Item>
						</Link>
						<Dropdown.Item>
							Settings
						</Dropdown.Item>
						<Dropdown.Item>
							Earnings
						</Dropdown.Item>
						<Dropdown.Divider />
						<button onClick={handleLogOut} type="button">
							<Dropdown.Item>
								Sign out
							</Dropdown.Item>
						</button>
					</Dropdown> : <Link to="/register">
						<button
							type="button"
							class="text-purple-600 bg-white border border-purple-700 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-large rounded-lg text-sm px-5 py-2.5 mr-5 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
							Sign in
						</button>
					</Link>}
				</div>
				<div
					class="hidden justify-between items-center w-full md:flex md:w-auto md:order-1"
					id="navbar-sticky">
					<ul class="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-12 md:mt-0 md:text-sm md:font-large md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
						<Link to="/">
							<li>
								<a class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent text-xl md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
									Home
								</a>
							</li>
						</Link>
						<Link to="/allcourses">
							<li>
								<a class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent text-xl md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
									Courses
								</a>
							</li>
						</Link>
						<Link to="/about">
							<li>
								<a class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent text-xl md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
									About
								</a>
							</li>
						</Link>
						<Link to="/contact">
							<li>
								<a class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent  text-xl md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
									Contact
								</a>
							</li>
						</Link>
					</ul>
				</div>
			</div>
		</nav >
	);
}



