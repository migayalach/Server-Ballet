require("dotenv").config();

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function _emailSend(email, nameUser) {
  try {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: `${process.env.EMAIL}`, // sender address
      to: `${email}`, // list of receivers
      subject: "Bienvenido a nuestra familia!", // Subject line
      html: `
        <div style="text-align: center;">
          <img src="https://res.cloudinary.com/dqgcyonb9/image/upload/v1723670218/Ballet/HOME/bftgpdiaqrof3bfi9mvt.webp" 
               alt="Bienvenido" 
               style="width: 50%; height: auto; border-radius: 10px;"/>
          <h1 style="color: #4CAF50;">¡Bienvenido ${nameUser}! 🎉🎊</h1>
          <p style="font-size: 20px; color: #555;">Ahora eres parte de nuestra familia y estamos ansiosos por verte.</p>
        </div>
      `, // html body
    });
    // console.log("Email enviado!");
  } catch (error) {
    // console.log("Lo sentimos no se pudo realizar el envio del email");
  }
}

module.exports = _emailSend;

// !DOCUMENTACION OFICIAL NODEMAILER
// https://github.com/nodemailer/nodemailer-amqp-example

// !HABILITACION PARA ACCESO A GMAIL
// https://www.youtube.com/watch?v=6daUw078RlM
// https://myaccount.google.com/apppasswords

// !App Passwords GMail
// nodeSendMailer
// crai jxfz eohy hamm
