import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteMessages, getMessages } from '../../redux/actions';
import styles from "./ContacUsd.module.css"
import { Toaster, toast } from 'react-hot-toast'

export const ContactUsd = () => {
    const mail = useSelector((state) => state.messages)
    const dispatch = useDispatch()

    /*  const handleDeleteAll = (e) => {
          e.preventDefault()
          dispatch(clearCart())
          toast.error('Cleaned!')
      } */

    useEffect(() => {
        dispatch(getMessages());
    }, [dispatch]);


    const handleDelete = (e) => {
        e.preventDefault()
        dispatch(deleteMessages(e.target.value))
        toast.error('Deleted message!')
    }

    return mail.length ? (
        <div class={styles.contenedorGeneral}>
            <div class={styles.contenedor}>
                <p class="text-3xl text-gray-900 dark:text-white">Your Mail</p>
                <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="py-3 px-6">
                                    <span class="sr-only">Mail</span>
                                    <th scope="col" class="py-3 px-6">
                                        E-Mail
                                    </th>
                                </th>
                                <th scope="col" class="py-3 px-6">
                                    Name
                                </th>
                                <th scope="col" class="py-3 px-6">
                                    Message
                                </th>
                                <th scope="col" class="py-3 px-6">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {mail?.map((mail) => (
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td class="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                                        {mail?.email}
                                    </td>
                                    <td class="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                                        {mail?.name}
                                    </td>
                                    <td class="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                                        {mail?.message}
                                    </td>
                                    <td class="py-4 px-6">
                                        <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" value={mail?.id} onClick={(e) => handleDelete(e)}>Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className={styles.buttonscontainer}>
                    <br />
                    <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={(e) => handleDeleteAll(e)}>Clear Mail</button>

                    <Toaster
                        position="bottom-right"
                    />
                </div>
            </div>
        </div>
    ) : (
        <div class={styles.contenedorGeneral}>
            <div class={styles.contenedor}>
                <p class="text-3xl text-gray-900 dark:text-white">Your mail is empty..</p>
                <br />
                <div>
                    <Link to="/home"><button type="button" class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Home</button></Link>
                </div>
            </div>
        </div>
    )
}