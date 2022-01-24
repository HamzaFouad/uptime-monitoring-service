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
  email: {
    smtp_host: `${process.env.SMTP_HOST}`,
    smtp_port: `${process.env.SMTP_PORT || "587"}`,
    secret: `${process.env.EMAIL_SECRET}`,
    confirm_expire_time: `${process.env.CONFIRM_EMAIL_EXPIRE_TIME || "1h"}`,
    no_reply_email: "no-reply@uptime.com",
    password: `${process.env.EMAIL_PASSWORD}`,
  },
};

let envConfig = {};

switch (env) {
  case "dev":
  case "development":
    envConfig = require("./envs/dev").config;
    break;
  case "prod":
  case "production":
    envConfig = require("./envs/prod").config;
    break;
  case "test":
  case "testing":
    envConfig = require("./envs/testing").config;
    break;
  default:
    envConfig = require("./envs/dev").config;
}

// if (env === "development") console.log("mergedConfig:\n", merge(baseConfig, envConfig));

export default merge(baseConfig, envConfig);
