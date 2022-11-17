import React, { useState } from 'react'
import { loadStripe } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import style from "./Stripe.module.css"
import axios from 'axios';
import { Button, Spinner } from "flowbite-react"


const stripePromise = loadStripe("pk_test_51M4ZacHhaXjOp4D8FbyV1NvNbspvPqNSq4DtsGSLM2jnydz8rtHuOztZFlkGLkgbCx31fhL7lLcXp5dEZK5Rvvmx00F7vVOLQI")


export const FormPago = () => {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();


  const handlePrueba = async (event) => {
    event.preventDefault();
    try {
      const products = [
        {
          name: "Product1",
          quantity: 1,
          price: 5000,
        },
        {
          name: "Product2",
          quantity: 1,
          price: 4000,
        },
        {
          name: "Product3",
          quantity: 1,
          price: 5000,
        },
        {
          name: "Product4",
          quantity: 1,
          price: 2000,
        },
      ];

      const obj = {
        products,
        // user,
        // idOrder
      }
      // stripe.paymentRequest({})
      const stripe2 = await stripePromise
      const response = await axios.post("/api/checkoutcart", obj)

      const session = await response.data;
      console.log(session);

      const result = await stripe2.redirectToCheckout({ sessionId: session.id })

      if (result.error) console.log(result.error);

    } catch (error) {
      console.log(error.message);
    }

  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),

    });

    setLoading(true);

    if (!error) {
      const { id } = paymentMethod;
      console.log(paymentMethod);

      try {
        const obj = { id, amount: 10000 }
        const { data } = await axios.post("/api/checkout", obj)
        console.log(data);
        elements.getElement(CardElement).clear();

      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
  }

  return (
    <div className={style.inputStripe}>
      <form onSubmit={handleSubmit}>
        <CardElement className={style.input} />
        <Button disabled={!stripe} color="gray"
          pill={true} type="submit">

          {
            loading ? (<Spinner aria-label="Default status example" />) : ("Comprar")
          }

        </Button>
      </form>
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
