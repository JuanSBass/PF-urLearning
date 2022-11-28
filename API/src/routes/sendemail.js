const { Router } = require("express");
const nodemailer = require("nodemailer");
const router = Router();

// router.post("/", async (req, res) => {
//   const { name, email } = req.body;
//   console.log("entra", name);
//   try {
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
//       <div
//       style="
//         display: flex;
//         flex-direction: column;
//         align-items: center;
//         padding: 2rem;
//         text-align: center;
//         margin: auto;
//         background-image: url(https://tse1.mm.bing.net/th?id=OIP.KRTBa_dnc2xaz20NC_59UAHaKe&pid=Api);
//       "
//     >
//       <h1>Bienvenido a</h1>
//       <img
//         src="https://media.discordapp.net/attachments/1039551546951745557/1039691706494353458/urLearning.png"
//         alt="logo"
//         style="width: 100%"
//       />
//       <p>
//         Gracias por unirte, <b>${name}</b> <br />
//         Tu registro se realizó exitosamente con tu correo <b>${email}</b>
//       </p>
//       <p>
//         Ahora puedes comprar cursos de tu interés, además tienes la posibilidad
//         de compartir tus conocimientos y generar ganancias 💸
//       </p>
//       <br />
//       <p>Comienza a explorar aqui 👇</p>
//       <a href="https://pf-ur-learning.vercel.app/"
//         >https://pf-ur-learning.vercel.app/allcourses</a
//       >
//     </div>
//     `,
//     };

//     transporter.sendMail(mailOptions, (error, response) => {
//       error ? res.json({ error }) : res.send("enviado");
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
    subject: "Bienvenido a urLearning",
    html: `
      <div
      style="
        align-items: center;
        padding: 2rem;
        text-align: center;
        margin: auto;
        background-image: url(https://tse1.mm.bing.net/th?id=OIP.KRTBa_dnc2xaz20NC_59UAHaKe&pid=Api);
      "
    >
      <h1>Bienvenido a</h1>
      <img
        src="https://media.discordapp.net/attachments/1039551546951745557/1039691706494353458/urLearning.png"
        alt="logo"
        style="width: 100%"
      />
      <p>
        Gracias por unirte, <b>${name}</b> <br />
        Tu registro se realizó exitosamente con tu correo <b>${email}</b>
      </p>
      <p>
        Ahora puedes comprar cursos de tu interés, además tienes la posibilidad
        de compartir tus conocimientos y generar ganancias 💸
      </p>
      <br />
      <p>Comienza a explorar aqui 👇</p>
      <a href="https://pf-ur-learning.vercel.app/allcourses"
        >https://pf-ur-learning.vercel.app/allcourses</a
      >
    </div>
    `,
  };

  transporter.sendMail(mailOptions, (error, response) => {
    if (error) console.log(error);
  });
};

const sendMailPurchase = (name, email) => {
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
    subject: "Compra exitosa",
    html: `
    <div
      style="
        padding: 2rem;
        text-align: center;
        margin: auto;
        background-image: url(https://tse1.mm.bing.net/th?id=OIP.KRTBa_dnc2xaz20NC_59UAHaKe&pid=Api);
      "
    >
      <h1>¡Gracias por tu compra, ${name}!</h1>
      <img
        src="https://media.discordapp.net/attachments/1039551546951745557/1039691706494353458/urLearning.png"
        alt="logo"
        style="width: 50%; margin: 0 auto"
      />
      <p>Disfruta de un acceso ilimitado a tus cursos.</p>
      <div
        style="
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          padding: 1.5rem;
          align-items: center;
          margin: 0 auto;
        "
      >
        <img
          src="https://cdn.discordapp.com/attachments/1036989969237028908/1045145560505647114/man-having-videocall-for-work.jpg"
          alt="tuki"
          style="height: 50%; width: 50%; border-radius: 2rem; margin: 1.5rem 0;"
        />
        <div style="margin: 1.5rem 0">
          <p>
            Cualquier consulta, incoveniente con tu compra, <br />
            duda o sugerencia, ponte en contacto con nosotros <br />
            mediante este correo <u>urLearning@outlook.com</u> por favor.
          </p>
          <hr />
          <p style="font-weight: 600;">Comienza tu aprendizaje ¡Ahora! 👇</p>
          <a href="https://pf-ur-learning.vercel.app/mycourses"
            >ver mis cursos</a
          >
        </div>
      </div>
    </div>
    `,
  };

  transporter.sendMail(mailOptions, (error, response) => {
    if (error) console.log(error);
  });
};

const sendMailCreateCourse = (name, email, title, image) => {
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
    subject: "Curso creado correctamente",
    html: `
    <div
      style="
        align-items: center;
        padding: 2rem;
        text-align: center;
        margin: auto;
        background-image: url(https://tse1.mm.bing.net/th?id=OIP.KRTBa_dnc2xaz20NC_59UAHaKe&pid=Api);
      "
    >
      <h1>Tu curso ${title} esta siendo verificado. </h1>
      <img
        src="https://media.discordapp.net/attachments/1039551546951745557/1039691706494353458/urLearning.png"
        alt="logo"
        style="width: 50%"
      />
      <p>
        Gracias por iniciar tu enseñanza con nosotros, <b>${name}</b>. <br />
      </p>
      <img
          src=${image}
          alt="tuki"
          style="height: 50%; width: 50%; border-radius: 2rem; margin: 1.5rem 0;"
        />
      <br />
      <p>En un plazo no mayor a 24 horas serás notificado cuando tu curso este disponible en nuestra página. <br>
        Si tienes alguna duda o aclaración puedes contactarnos con este email <u>urLearning@outlook.com</u>.
      </p>
      <p>Te invitamos a explorar más cursos de tu interés aqui 👇 <br>
      <a href="https://pf-ur-learning.vercel.app/allcourses"
        >https://pf-ur-learning.vercel.app/allcourses</a></p>
    </div>
    `,
  };

  transporter.sendMail(mailOptions, (error, response) => {
    if (error) console.log(error);
  });
};

module.exports = { sendMailCreateCourse, sendMailPurchase, sendMailRegister };
