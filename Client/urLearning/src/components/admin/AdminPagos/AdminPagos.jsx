import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./AdminPagos.module.css";
import { Link } from "react-router-dom";
import { Rating, Card, Button, Spinner, Table } from "flowbite-react";
import { async } from "@firebase/util";
function AdminPagos(props) {
    const [ordenes, setOrdenes] = useState([]);

    useEffect(() => {
        const axiosData = async () => {
            let response = await axios.get('/admin/allOrders');
            response = await response.data;
            setOrdenes(response);
        }
        axiosData();
    }, [])

    const handleInput = () => {

    }

    console.log(ordenes)
    return (

        <div className={styles.main}>
            <div className={styles.cardscontainer}>

                <Table>
                    <Table.Head>
                        <Table.HeadCell>
                            User
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Items
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Total amount
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Payment status
                        </Table.HeadCell>
                        <Table.HeadCell>
                            <span className="sr-only">
                                Edit
                            </span>
                        </Table.HeadCell>
                    </Table.Head>

                    <Table.Body className="divide-y">

                        {ordenes.length ? ordenes.map((orden) => {
                            return (<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {orden.user.name}
                                </Table.Cell>
                                <Table.Cell>
                                    {orden.courses.map(curso => curso.title + " - ")}
                                </Table.Cell>
                                <Table.Cell>
                                    US$ {orden.amount_total}
                                </Table.Cell>
                                <Table.Cell>
                                    {orden.payment_status}
                                </Table.Cell>
                                <Table.Cell>
                                    <a
                                        // href="/tables"
                                        className="font-medium text-blue-600 hover:underline dark:text-blue-500"

                                    >
                                        Edit
                                    </a>
                                </Table.Cell>
                            </Table.Row>)
                        }) : <Spinner
                            color="purple"
                            aria-label="Purple spinner example"
                        />}

                    </Table.Body>

                </Table>
            </div>
        </div>)
}

export default AdminPagos;