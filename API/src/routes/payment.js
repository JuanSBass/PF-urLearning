const { Router } = require("express");
const router = Router();
const Stripe = require("stripe");
const apiKeyPayment = process.env.API_KEY_PAYMENT;
const { Order, User, Course } = require("../db.js");
const admin = require("../firebase/config");
const { sendMailPurchase } = require("./sendemail.js");

const stripe = new Stripe(apiKeyPayment);

router.post("/checkoutcart", async (req, res) => {
  const { products, tuki, cart } = req.body;

  const decodeValue = await admin.auth().verifyIdToken(tuki);
  if (!decodeValue) return new Error("no se pudio");
  const userId = decodeValue.uid;

  let arrayProducts = [];
  cart.forEach((product) => {
    let lineProduct = {
      price_data: {
        currency: "USD",
        product_data: {
          name: product.title,
          images: [product.image],
        },
        unit_amount: product.price * 100,
      },
      quantity: 1,
    };
    arrayProducts.push(lineProduct);
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: arrayProducts,
    mode: "payment",
    success_url: "https://pf-ur-learning.vercel.app/formpage/success",
    cancel_url: "https://pf-ur-learning.vercel.app/formpage/failed",
  });

  let comprobanteAsociado = await Order.create({
    order_id: session.id,
    status: session.status,
    payment_status: session.payment_status,
    amount_total: session.amount_total,
    userId,
    items: arrayProducts,
  });

  //asocio cada curso del carrito a la orden
  cart.forEach(async (element) => {
    let oneCurse = await Course.findByPk(element.idCourse);
    let currentOrder = await Order.findByPk(session.id);
    await currentOrder.addCourse(oneCurse);
  });
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

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const payment = await Order.findOne({ where: { order_id: id } });
    return res.send(payment);
  } catch (error) {
    console.log(error);
    res.status(404).send({ error });
  }
});

/**PRE: El usuario previamente cargado en la base de datos y la compra
 * realizada por stripe.
 *
 * POST: Accede automaticamente (es accionada cuando se monta un componente de )
 * a la ultima orden de compra generada por el usuario y actualiza los datos de la
 * compra .
 *
 * OBS: Habría que recibir el acces token, validarlo y de ahi sacar el user_id
 */

router.put("/updateLastOrer", async (req, res) => {
  const { tokken } = req.body;
  try {
    const decodeValue = await admin.auth().verifyIdToken(tokken);
    if (!decodeValue) return new Error("no se pudio");
    const userId = decodeValue.uid;
    const lastOrder = await Order.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });
    const { order_id } = lastOrder[0];
    const stripeOrder = await stripe.checkout.sessions.retrieve(order_id);
    const { payment_status } = stripeOrder;
    const finalUpdate = await Order.update(
      { payment_status },
      {
        where: {
          order_id,
        },
      }
    );
    res.status(200).send(finalUpdate);
  } catch (error) {
    console.log(error.message);
    res.status(405).send({ error });
  }
});

router.put("/updateUserCourseRelations", async (req, res) => {
  const { tokken, carrito } = req.body;
  let message;
  try {
    const decodeValue = await admin.auth().verifyIdToken(tokken);
    if (!decodeValue) return new Error("no se pudio");
    // aqui modifico para el nodemailer
    const userId = decodeValue.uid;
    const userEmail = decodeValue.email;
    const userName = decodeValue.name;

    const lastOrder = await Order.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });
    if (!lastOrder[0])
      throw new Error("there is a prblem with the user's las order");
    const { order_id } = lastOrder[0];
    const stripeOrder = await stripe.checkout.sessions.retrieve(order_id);
    const { payment_status } = stripeOrder;

    if (payment_status === "paid") {
      sendMailPurchase(userName, userEmail);
      let currentUser = await User.findByPk(userId);
      //asocio acada curso del carrito ya pagado al usuario
      carrito.forEach(async (element) => {
        let oneCurse = await Course.findByPk(element.idCourse);
        await currentUser.addCourse(oneCurse);
      });
      message = "Relation successfull";
    } else {
      message = "Relation failed, check if payment status is paid";
    }
    res.status(200).send(message);
  } catch (error) {
    console.log(error.message);
    res.status(405).send(error);
  }
});
module.exports = router;
