const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // 1) Create a transporter, service that will send email
  const transporter = nodemailer.createTestAccount({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    // Activate in gmail "less secure app" option
  });

  // 2) Define email option
  const mailOptions = {
    from: "Vinayak Agarwal <vinayakagarwal7989@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html:
  };

  // 3) actually send email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
