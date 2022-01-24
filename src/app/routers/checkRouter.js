import { Router } from "express";
import { checkCreateValidator, checkUpdateValidator } from "../validators/checkValidator";
import { createCheck, updateCheck, deleteCheck } from "../controllers/checkController";

const router = Router();

// api/
// router.route("/checks").get(controllers.getChecks);
router.route("/check").post(checkCreateValidator, createCheck);
router.route("/check/:id").put(checkUpdateValidator, updateCheck);
router.route("/check/:id").delete(deleteCheck);

export default router;
