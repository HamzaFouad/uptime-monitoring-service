import { Router } from "express";
import { signUp, signIn, confirmEmail } from "./auth.controllers";

const router = Router();

// /api/auth

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/confirmation/:token", confirmEmail);

export default router;
