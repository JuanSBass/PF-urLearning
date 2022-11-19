import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getCart, removeItemCart } from '../../redux/actions';
import styles from "./Shop.module.css";

export const Shop = () => {
    const cart = useSelector((state) => state.carrito)
    console.log(cart)
    const dispatch = useDispatch()
    const history = useHistory()

    // eslint-disable-next-line
    // const [order, setOrder] = useState(""); //estado local
    // setOrder(e.target.value)

    useEffect(() => {
        console.log('soy getCart')
        console.log(getCart())
        dispatch(getCart());
    }, [dispatch]);

    const handleDelete = (e) => {
        e.preventDefault()
        dispatch(removeItemCart(e.target.value))
        console.log(e.target.value)
    }


    return (
        <div class={styles.container}>
            <h1>Shop</h1>
            <section className={styles.cardscontainer}>
                {cart?.map((card) => (
                    <div className={styles.card}>
                        <div className={styles.imgcard}>
                            <img src={card.image} alt="miniatura" />
                        </div>
                        <h3>{card.title}</h3>
                        <p>{card.name_prof}</p>
                        <p>{card.description}</p>
                        <p>{card.ratingHistory}</p>
                        <p>{card.price}</p>
                        <button value={card.ID} onClick={(e) => handleDelete(e)}>Remove</button>
                    </div>
                ))}
            </section>
        </div>
    )
}
