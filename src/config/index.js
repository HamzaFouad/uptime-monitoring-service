import { merge } from "lodash";
import dotenv from "dotenv";

dotenv.config();

const env = process.env.NODE_ENV || "development";
const baseConfig = {
  env,
  isDev: env === "development" || env === "dev",
  isProd: env === "production" || env === "prod",
  isTest: env === "testing" || env === "test",
  port: process.env.APP_PORT || 4000,
  secrets: {
    jwt: process.env.JWT_SECRET,
    jwtExp: process.env.JWT_EXP || "30m",
  },
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
  case "test":
  case "testing":
    envConfig = require("./testing").config;
    break;
  default:
    envConfig = require("./dev").config;
}

console.log("mergedConfig:\n", merge(baseConfig, envConfig));
export default merge(baseConfig, envConfig);
