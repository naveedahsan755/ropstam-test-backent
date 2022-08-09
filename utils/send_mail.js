const nodemailer = require("nodemailer");

async function sendMail(to, pass) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "safaribooks0020@gmail.com",
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: "safaribooks0020@gmail.com",
    to,
    subject: "Account Creation at testCar",
    text: `Thank you for registering with testCar. Your login password is: ${pass}`,
  };

  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

module.exports = sendMail;
