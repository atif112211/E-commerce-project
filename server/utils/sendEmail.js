import nodemailer from "nodemailer";

export const sendEmail = async ({ email, subject, message }) => {
  console.log("Sending email to:", email);

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // must be true for port 465
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD, // Gmail App Password
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_EMAIL,
    to: email,
    subject,
    html: message,
  });

  console.log("Email sent successfully to", email);
};
