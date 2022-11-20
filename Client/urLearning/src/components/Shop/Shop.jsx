import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearCart, getCart, removeItemCart } from '../../redux/actions';
import styles from "./Shop.module.css";

export const Shop = () => {
    const cart = useSelector((state) => state.carrito)
    console.log(cart.length)
    const dispatch = useDispatch()

    const handleDeleteAll = (e) => {
        e.preventDefault()
        console.log('Soy el handleDeleteALll')
        dispatch(clearCart())
        console.log("Vengo luego del hanldeDeleteAll")
    }

    useEffect(() => {
        console.log('soy getCart')
        console.log(getCart())
        dispatch(getCart());
    }, [dispatch]);

    const handleDelete = (e) => {
        e.preventDefault()
        dispatch(removeItemCart(e.target.value))
        console.log(e.target.value, 'eeeeeeeee')
    }

    return cart.length ? (
        <div class={styles.Table}>
            <p class="text-3xl text-gray-900 dark:text-white">Your Cart</p>
            <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="py-3 px-6">
                                <span class="sr-only">Image</span>
                            </th>
                            <th scope="col" class="py-3 px-6">
                                Course
                            </th>
                            <th scope="col" class="py-3 px-6">
                                Price
                            </th>
                            <th scope="col" class="py-3 px-6">
                                Descripcion
                            </th>
                            <th scope="col" class="py-3 px-6">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart?.map((card) => (
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td class="p-4 w-32">
                                    <img src={card.image} alt="miniatura" />
                                </td>
                                <td class="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                                    {card.title}
                                </td>
                                <td class="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                                    {card.price}
                                </td>
                                <td class="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                                    {card.description}
                                </td>
                                <td class="py-4 px-6">
                                    <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" value={card.ID} onClick={(e) => handleDelete(e)}>Remove</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <br />
                <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={(e) => handleDeleteAll(e)}>Clear Cart</button>
            </div>
        </div>
    ) : (
        <div class={styles.contenedorGeneral}>
            <div class={styles.contenedor}>
                <p class="text-3xl text-gray-900 dark:text-white">Your cart is empty..</p>
                <br />
                <div>
                    <Link to="/allcourses"><button type="button" class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Add Courses</button></Link>
                </div>
            </div>
        </div>
    )
}