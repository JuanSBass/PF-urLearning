import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart, removeItemCart } from '../../redux/actions';
import styles from "./Shop.module.css";

export const Shop = () => {
    const cart = useSelector((state) => state.carrito)
    const dispatch = useDispatch()

    const handleDeleteAll = (e) => {
        e.preventDefault()
        dispatch(clearCart())
    }

    useEffect(() => {
        dispatch(getCart());
    }, [dispatch]);

    const handleDelete = (e) => {
        e.preventDefault()
        dispatch(removeItemCart(e.target.value))
    }

    return cart.length ? (
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
            <div>
                <button onClick={(e) => handleDeleteAll(e)}>Borrar todo</button>
            </div>
        </div>
    ) : (
        <div class={styles.container}>
            <h1>toi solo</h1>
        </div>
    )
}

