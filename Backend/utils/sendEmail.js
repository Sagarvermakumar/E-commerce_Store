const nodeMailer = require('nodemailer');

const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
  host: 'smtppro.zoho.in',
   secure: true,
   port: 465,
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_PASSWORD
    }
  });
  const mailOptions = {
    from: process.env.SMPT_EMAIL,
    to: options.email,
    subject: options.subject,
    text: options.message
  }

  await transporter.sendMail(mailOptions)
}

module.exports = sendEmail;