import express from "express";
import config from "./config";

export const app = express();

app.get("/", (req, res) => {
  return res.send("Express setup is initialized!");
});

export const start = async () => {
  app.listen(3000, () => {
    console.log(`Server running on http://localhost:${config.port}`);
  });
};
