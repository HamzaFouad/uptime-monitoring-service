import express from "express";
import config from "./config";
import { connect } from "./utils/db";

export const app = express();

app.get("/", (req, res) => {
  return res.send("Express setup is initialized!");
});

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
