import config from "../config";
import jwt from "jsonwebtoken";

export const newToken = (user) => {
  try {
    console.log(
      jwt.sign({ id: user.id }, config.secrets.jwt, {
        expiresIn: config.secrets.jwtExp,
      })
    );

    return jwt.sign({ id: user.id }, config.secrets.jwt, {
      expiresIn: config.secrets.jwtExp,
    });
  } catch {
    console.error("Something went wrong when creating newToken for the user");
  }
};

export const verifyToken = (token) => {
  try {
    console.log(jwt.verify(token, config.secrets.jwt));
    return jwt.verify(token, config.secrets.jwt);
  } catch {
    console.error("Something went wrong when verifying user's token");
  }
};
