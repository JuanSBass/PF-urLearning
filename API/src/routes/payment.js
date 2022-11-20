const { Router } = require("express");
const router = Router();
const Stripe = require("stripe");
const apiKeyPayment = process.env.API_KEY_PAYMENT;
const { Order, User, Course } = require("../db.js");
const admin = require("../firebase/config");

const stripe = new Stripe(apiKeyPayment);

router.post("/checkoutcart", async (req, res) => {
  const { products, userId } = req.body;

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
  console.log(userId);

  let comprobanteAsociado = await Order.create({
    order_id: session.id,
    status: session.status,
    payment_status: session.payment_status,
    amount_total: session.amount_total,
    userId,
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
  const { token } = req.body;
  try {
    const decodeValue = await admin.auth().verifyIdToken(token);
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
  const { token, courseId } = req.body;
  let message;
  try {
    const decodeValue = await admin.auth().verifyIdToken(token);
    if (!decodeValue) return new Error("no se pudio");

    const userId = decodeValue.uid;
    const lastOrder = await Order.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });
    if (!lastOrder[0])
      throw new Error("theres a prblem with the user's las order");
    const { order_id } = lastOrder[0];

    const stripeOrder = await stripe.checkout.sessions.retrieve(order_id);
    const { payment_status } = stripeOrder;

    if (payment_status === "paid") {
      //aca hago las relaciones en la tabla intermedia con el id del curso y del usuario
      let currentUser = await User.findByPk(userId);
      let currentCourse = await Course.findByPk(courseId);
      await currentUser.addCourse(currentCourse);
      //await currentCourse.addUser(currentUser); CREO que esta linea no hace falta
      console.log("ldkflsdkflskd", await currentUser.getCourses());
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

// GUARDAR USERID, SESIONID, ORDER
