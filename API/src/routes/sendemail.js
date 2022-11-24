const nodemailer = require("nodemailer");
// const { Router } = require("express");
// const router = Router();

// router.post("/", async (req, res) => {
//   try {
//     const { name, email } = req.body;
//     // EmailSender({ name, email });

//     let transporter = nodemailer.createTransport({
//       service: "hotmail",
//       auth: {
//         user: "urLearning@outlook.com",
//         pass: "somosgrupo11",
//       },
//     });

//     let mailOptions = {
//       from: "urLearning <urLearning@outlook.com>",
//       to: email,
//       subject: "Mensaje de urLearning",
//       html: `
//       <h1>Hola, es una prueba</h1>
//       <p>Bienvenido a urLearning, ${name}</p>
//       <p>Tu registro se realizó exitosamente con tu correo ${email}</p>
//     `,
//     };

//     transporter.sendMail(mailOptions, (error, response) => {
//       error ? res.send(error) : res.send("enviado");
//     });

//     res.send("email enviado");
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

const sendMailRegister = (name, email) => {
  let transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: "urLearning@outlook.com",
      pass: "somosgrupo11",
    },
  });

  let mailOptions = {
    from: "urLearning <urLearning@outlook.com>",
    to: email,
    subject: "Mensaje de urLearning",
    html: `
      <h1>Hola, es una prueba</h1>
      <p>Bienvenido a urLearning, ${name}</p>
      <p>Tu registro se realizó exitosamente con tu correo ${email}</p>
    `,
  };

  transporter.sendMail(mailOptions, (error, response) => {
    error ? res.send(error) : res.send("enviado");
  });
};

module.exports = sendMailRegister;
