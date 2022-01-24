import { body } from "express-validator";
import { merge } from "lodash";

const commonValidators = [
  body("name").optional().trim(),
  body("path").optional().trim(),
  body("port").optional().isNumeric(),
  body("webhook").optional().isArray(),
  body("tags").optional().isArray(),
  body("protocol").optional().trim().toLowerCase().isIn(["http", "https", "tcp"]),
  body("authentication").optional().isObject(),
  body("httpHeaders").optional().isObject(),
  body("assert").optional().isObject(),
  body("ignoreSSL").optional().isBoolean(),
  body("timeout").optional().isNumeric(),
  body("interval").optional().isNumeric(),
  body("threshold").optional().isNumeric(),
];

export const checkCreateValidator = merge(commonValidators, [
  body("url").exists().withMessage("URL is required.").isURL().withMessage("Invalid URL format.").isString().trim(),
]);

export const checkUpdateValidator = merge(commonValidators, [
  body("url").optional().isURL().withMessage("Invalid URL format.").isString().trim(),
]);
