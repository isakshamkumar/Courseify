const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ksaksham39@gmail.com",
    pass: "egzx neza pzed wpoq",
  },
});

export async function sendEmail(to:string, subject:string, text:string) {
  const info = await transporter.sendMail({
    from: "ksaksham39@gmail.com",
    to,
    subject,
    text,
    html: `<b>${text}</b>`,
  });

  console.log("Message sent: %s", info.messageId);
}
