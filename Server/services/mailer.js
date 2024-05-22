const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "gmail",
  // port: Number(process.env.SMTP_PORT),
  // secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const mailer = async (email, subject, body) => {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"From Blog Mgmt" <bnagari154@gmail.com>',
    to: email,
    subject,
    html: `<b>${body}</b>`,
  });

  return info.messageId;
};

module.exports = { mailer };
