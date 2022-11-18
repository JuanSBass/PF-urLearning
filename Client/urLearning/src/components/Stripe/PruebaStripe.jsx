import React, { useState } from 'react'
import { loadStripe } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import style from "./Stripe.module.css"
import axios from 'axios';
import { Button, Spinner } from "flowbite-react"
import { idSession } from '../../redux/actions';
import { useDispatch } from 'react-redux';
// import UserLogeado from reducer


const stripePromise = loadStripe("pk_test_51M4ZacHhaXjOp4D8FbyV1NvNbspvPqNSq4DtsGSLM2jnydz8rtHuOztZFlkGLkgbCx31fhL7lLcXp5dEZK5Rvvmx00F7vVOLQI")


export const FormPago = () => {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch()


  const handlePrueba = async (event) => {
    event.preventDefault();
    try {
      const products = [
        {
          id: 1,
          name: "Product1",
          quantity: 1,
          price: 5000,
        },
        {
          id: 2,
          name: "Product2",
          quantity: 1,
          price: 4000,
        },
        {
          id: 3,
          name: "Product3",
          quantity: 1,
          price: 5000,
        },
        {
          id: 4,
          name: "Product4",
          quantity: 1,
          price: 2000,
        },
      ];

      const obj = {
        products,
        // accesstoken,
        // session.id
      }
      // stripe.paymentRequest({})
      const stripe2 = await stripePromise
      const response = await axios.post("/api/checkoutcart", obj)

      const session = await response.data;
      // console.log(session);
      dispatch(idSession(session.id))

      const result = await stripe2.redirectToCheckout({ sessionId: session.id })

      if (result.error) console.log(result.error);

    } catch (error) {
      console.log(error.message);
    }

  };


  return (
    <div className={style.inputStripe}>
      <button onClick={handlePrueba} role="link">PAGAR AHORA</button>
    </div>
  )

}



const PruebaStripe = () => {
  return (
    <Elements stripe={stripePromise}  >
      <FormPago />
    </Elements>
  )
}

export default PruebaStripe

