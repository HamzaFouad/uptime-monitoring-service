import express from "express";
import { json, urlencoded } from "body-parser";
import config from "./config";
import { connect } from "./config/db";
import authRouter from "./auth/auth.router";
import checkRouter from "./app/routers/checkRouter";
export const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.send("Express setup is initialized!");
});

app.use("/api/auth", authRouter);
app.use("/api", checkRouter);

export const start = async () => {
  try {
    connect()
      .then(() => console.log("MongoDB Connected"))
      .catch((e) => console.log(e));

    app.listen(3000, () => {
      console.log(`Server running on http://localhost:${config.port}`);
    });
  } catch (e) {
    console.error(e);
  }
};
