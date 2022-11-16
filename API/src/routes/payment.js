const { Router } = require("express");
const router = Router();
const Stripe = require("stripe");
const apiKeyPayment = process.env.API_KEY_PAYMENT;

const stripe = new Stripe(apiKeyPayment);

router.post("/checkout", async (req, res) => {
  try {
    const { id, amount } = req.body;

    const payment = await stripe.paymentIntents.create({
      customer: customer.id,
      amount,
      currency: "USD",
      description: "description Product",
      payment_method: id,
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    console.log(payment);
    res.send({ message: "Pago realizado" });
  } catch (error) {
    res.send(error.raw.message);
  }
});

router.post("/checkoutcart", async (req, res) => {
  const { products } = req.body;

  let arrayProducts = [];
  products.forEach((product) => {
    let lineProduct = {
      price_data: {
        currency: "USD",
        product_data: {
          name: product.name,
          images: [
            "https://edicioneszigurat.mx/wp-content/uploads/2021/01/cursodefilosofia.png",
          ],
        },
        unit_amount: product.price,
      },
      quantity: 1,
    };
    arrayProducts.push(lineProduct);
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: arrayProducts,
    mode: "payment",
    success_url: "http://localhost:5173/formpage",
    cancel_url: "http://localhost:5173/formpage",
  });
  res.json({ id: session.id });
});

module.exports = router;
