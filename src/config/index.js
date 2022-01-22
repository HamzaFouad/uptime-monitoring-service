import { merge } from "lodash";
import dotenv from "dotenv";

dotenv.config();

const env = process.env.NODE_ENV || "development";
const baseConfig = {
  env,
  isDev: env === "development" || env === "dev",
  isProd: env === "production" || env === "prod",
  port: process.env.APP_PORT || 4000,
};

let envConfig = {};

switch (env) {
  case "dev":
  case "development":
    envConfig = require("./dev").config;
    break;
  case "prod":
  case "production":
    envConfig = require("./prod").config;
    break;
  default:
    envConfig = require("./dev").config;
}

console.log("mergedConfig:\n", merge(baseConfig, envConfig));
export default merge(baseConfig, envConfig);
