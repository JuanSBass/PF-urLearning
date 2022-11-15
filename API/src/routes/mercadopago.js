const mercadopago = require("mercadopago");
// const { BACK_URL, FRONT_URL } = process.env;
const { User } = require("../db");
const { Router } = require("express");
const router = Router();

mercadopago.configure({
  access_token:
    "TEST-6096316236554543-111510-feb686e59cf81b2e87147801a9b94c52-197234786",
});

let id_compra = 1;

//Generamos la url de MP
router.post("/api/pay", async (req, res, next) => {
  const { email } = req.query;
  const { items } = req.body;

  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (user) {
      let preference = {
        items,
        external_reference: `${id_compra++}`,
        payment_methods: {
          excluded_payment_types: [{ id: "atm" }],
          installments: 6,
        },
        back_urls: {
          success: "http://localhost:5173/allcourses",
          failure: "http://localhost:5173/",
          pending: "http://localhost:5173/",
        },
      };

      mercadopago.preferences
        .create(preference)
        .then(function (response) {
          global.id = response.body.id;
          res.json({ id: global.id });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/feedback", function (req, res) {
  res.json({
    Payment: req.query.payment_id,
    Status: req.query.status,
    MerchantOrder: req.query.merchant_order_id,
  });
});

// Ruta que recibe la informacion del pago
// router.get("/pagos/:id", async (req, res) => {
//   const { payment_id, status, external_reference, merchant_order_id } =
//     req.query;
//   const { id } = req.params;

//   try {
//     const user = await User.findByPk(Number(id));

//     // Aqui edito el status de la orden
//     const newOrder = await Order.create({ external_reference });

//     if (payment_id) newOrder.payment_id = payment_id;
//     if (status) newOrder.payment_status = status;
//     if (merchant_order_id) newOrder.merchant_order_id = merchant_order_id;
//     newOrder.status = "completed";

//     try {
//       await user.addOrders(newOrder);
//       await newOrder.save();
//       return res.redirect(`${FRONT_URL}/checkout`);
//     } catch (err) {
//       console.log(err);
//       return res.redirect(`${FRONT_URL}/error`);
//     }
//   } catch (err) {
//     console.error("error al buscar", err);
//     return res.redirect(`${FRONT_URL}/error`);
//   }
// });

module.exports = router;
