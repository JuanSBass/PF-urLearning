const { Router } = require("express");
const router = Router();
const Stripe = require("stripe");
const apiKeyPayment = process.env.API_KEY_PAYMENT;

const stripe = new Stripe(apiKeyPayment);

router.post("/checkout", async (req, res) => {
  try {
    const { id, amount } = req.body;

    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "description Product",
      payment_method: id,
      confirm: true,
    });

    console.log(payment);
    res.send({ message: "Pago realizado" });
  } catch (error) {
    res.send(error.raw.message);
  }
});

module.exports = router;
