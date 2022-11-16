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
          pill={true}>

          {
            loading ? (<Spinner aria-label="Default status example" />) : ("Comprar")
          }

        </Button>
      </form>
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
