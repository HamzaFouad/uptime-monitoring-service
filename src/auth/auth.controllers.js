import _ from "lodash";
import { User } from "../resources/user/user.model";
import { verifyHash } from "../utils/crypto";
import { verifyToken } from "./helpers";

export const signIn = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: "Invalid email or password" });
  }
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (!userExists) return res.status(401).send({ message: "Invalid email or password" });

    if (!(await verifyHash(userExists.password, req.body.password)))
      return res.status(401).send({ message: "Invalid email or password" });

    if (!userExists.isVerified) return res.status(401).send({ message: "Your Email has not been verified." });

    return res.status(200).send("User successfully logged in");
  } catch (e) {
    return res.status(500).end();
  }
};

export const signUp = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: "Invalid email or password" });
  }

  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res
        .status(400)
        .send({ error: { message: "This email address is already associated with another account." } });
    }

    const user = await User.create({ ...req.body });
    console.log("CreatedUser: ", user);
    res.status(201).send(`A verification Email has been sent to ${user.email}.`);

    verifyUserEmail(user.toJSON());
  } catch (e) {
    return res.status(500).end();
  }
};

export const confirmEmail = async (req, res) => {
  try {
    const id = verifyToken(req.params.token);
    if (!id) {
      return res.status(400).send("Invalid token, please use another token and try again later.");
    }

    // let user = await User.findOneAndUpdate({ _id: "61ed87d5b47d6f84652b0618" }, { isVerified: true });
    return res.status(200).send("Your Email has been verified.");
  } catch (e) {
    return res.status(500).send("Something went wrong while confirming the email.");
  }
};
