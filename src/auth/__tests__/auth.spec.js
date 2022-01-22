import { newToken, verifyToken } from "../authHandler";
import jwt from "jsonwebtoken";
import config from "../../config";

describe("Authentication:", () => {
  describe("newToken", () => {
    test("create newJWT from user", () => {
      const id = 123;
      const token = newToken({ id });
      const user = jwt.verify(token, config.secrets.jwt);

      expect(user.id).toBe(id);
    });
  });

  describe("verifyToken", () => {
    test("validate JWT and return payload", () => {
      const id = 123;
      const token = jwt.sign({ id }, config.secrets.jwt);
      const user = verifyToken(token);
      expect(user.id).toBe(id);
    });
  });
});
