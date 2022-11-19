const { Router } = require("express");
const router = Router();
const Stripe = require("stripe");
const apiKeyPayment = process.env.API_KEY_PAYMENT;

const stripe = new Stripe(apiKeyPayment);

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
    success_url: `http://localhost:5173/formpage/success`,
    cancel_url: "http://localhost:5173/formpage/failed",
  });
  console.log(session);
  res.json({ id: session.id });
});

router.get("/customer/:id", async (req, res) => {
  const id = req.params.id;
  const customer = await stripe.customers.retrieve(id);
  res.send(customer);
});

router.get("/checkout/:id", async (req, res) => {
  const { id } = req.params;
  const session = await stripe.checkout.sessions.retrieve(id, {
    expand: ["line_items"],
  });
  res.send(session);
});

/**PRE: El usuario previamente cargado en la base de datos y la compra
 * realizada.
 *
 * POST: Guarda los datos de la "session" y los relaciona al id del usuario
 * que viene por body.
 *
 * OBS: Habría que recibir el acces token, validarlo y de ahi sacar el user_id?
 */
router.post("/checkout/confirmation/:id", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    const session = await stripe.checkout.sessions.retrieve(id, {
      expand: ["line_items"],
    });

    let comprobanteAsociado = await Order.create({
      order_id: id,
      status: session.status,
      payment_status: session.payment_status,
      amount_total: session.amount_total,
      userId,
    });

    res.status(200).send(comprobanteAsociado);
  } catch (error) {
    res.status(401).send(error.message);
  }
});

module.exports = router;

// GUARDAR USERID, SESIONID, ORDER
