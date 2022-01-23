import nodemailer from "nodemailer";
import config from "../config";

const smtpTransport = nodemailer.createTransport({
  host: config.email.smtp_host,
  port: config.email.smtp_port,
  auth: {
    user: config.email.no_reply,
    pass: config.email.password,
  },
});

export const sendMail = async (from, to, subject, body) => {
  const sendResult = await smtpTransport.sendMail({
    from: from,
    to: to,
    subject: subject,
    text: body,
  });
};
