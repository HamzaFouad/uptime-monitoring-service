import { Router } from "express";
import { checkValidator } from "../validators/checkValidator";
import { createCheck } from "../controllers/checkController";
const router = Router();

// api/
// router.route("/checks").get(controllers.getChecks);
router.route("/check").post(checkValidator, createCheck);
// .put(checkValidator, controllers.UpdateCheck)
// .delete(controllers.deleteCheck);

export default router;
