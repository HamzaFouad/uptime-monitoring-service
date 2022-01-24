import { Router } from "express";
import { checkCreateValidator, checkUpdateValidator } from "../validators/checkValidator";
import { createCheck, updateCheck } from "../controllers/checkController";
const router = Router();

// api/
// router.route("/checks").get(controllers.getChecks);
router.route("/check").post(checkCreateValidator, createCheck);

router.route("/check/:id").put(checkUpdateValidator, updateCheck);
// .delete(controllers.deleteCheck);

export default router;
