import { sendMail } from "../utils/emailHelper";
import config from "../config";
import jwt from "jsonwebtoken";

export const newToken = (user) => {
  try {
    return jwt.sign({ id: user.id }, config.secrets.jwt, {
      expiresIn: config.secrets.jwtExp,
    }); // returns token associated with the provided user.id
  } catch {
    console.error("Something went wrong when creating newToken for the user");
  }
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, config.secrets.jwt); // returns { id, iat, exp }
  } catch {
    console.error("Something went wrong when verifying user's token");
  }
};

export const verifyUserEmail = (user) => {
  try {
    const emailToken = jwt.sign(
      {
        user: user._id,
      },
      config.email.secret,
      { expiresIn: config.email.confirm_expire_time }
    );

    const url = `http://localhost:${config.port}/confirmation/${emailToken}`;
    const body = `Please, click this email to confirm your email address: ${url}`;
    const subject = "Confirmation Email";
    sendMail(config.email.no_reply, user.email, subject, body);
  } catch {
    console.log("Error while sending verification email");
  }
};
