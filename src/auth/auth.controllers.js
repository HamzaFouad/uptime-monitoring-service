import _ from "lodash";
import { User } from "../entities/userEntity";
import { verifyHash } from "../utils/crypto";
import { newToken, verifyToken } from "./authHelpers";

export const signIn = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: "Invalid email or password" });
  }
  try {
    const user = await User.findOne({ email: req.body.email })
      .select("email password isVerified")
      .exec();
    if (!user) return res.status(401).send({ message: "Invalid email or password" });

    if (!(await verifyHash(user.password, req.body.password)))
      return res.status(401).send({ message: "Invalid email or password" });

    if (!user.isVerified)
      return res.status(401).send({ message: "Your Email has not been verified." });

    const token = newToken(user);
    return res.status(201).send({ token: token });
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
      return res.status(400).send({
        error: { message: "This email address is already associated with another account." },
      });
    }

    const user = await User.create({ ...req.body });
    console.log("CreatedUser: ", user);
    res.status(201).send(`A verification Email has been sent to ${user.email}.`);

    verifyUserEmail(user.toJSON());
  } catch (e) {
    return res.status(500).end();
  }
};

export const protect = async (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer || !bearer.startsWith("Bearer ")) return res.status(401).end();
  const token = bearer.split("Bearer ")[1].trim();
  let payload;
  try {
    payload = verifyToken(token);
  } catch (e) {
    return res.status(401).end();
  }
  const user = await User.findById(payload.id).select("_id isVerified").lean().exec();
  if (!user) return res.status(401).send({ message: "Unauthorized" });
  if (!user.isVerified)
    return res.status(404).send({ message: "Your Email has not been verified." });
  req.user = user;
  next();
};

export const confirmEmail = async (req, res) => {
  try {
    const id = verifyToken(req.params.token);
    if (!id) {
      return res
        .status(400)
        .send("Invalid token, please use another token and try again later.");
    }

    // let user = await User.findOneAndUpdate({ _id: "61ed87d5b47d6f84652b0618" }, { isVerified: true });
    return res.status(200).send("Your Email has been verified.");
  } catch (e) {
    return res.status(500).send("Something went wrong while confirming the email.");
  }
};
