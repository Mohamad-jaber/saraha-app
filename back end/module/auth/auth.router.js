import { Router } from "express";
import { validation } from "../../middlewear/validation.js";
import {
  signin,
  signup,
  verifyEmail,
  refreshToken,
  sendCode,
  forgetPassword,
  allUsers,
} from "./controller/auth.controller.js";
import * as validators from "./auth.validatores.js";
const router = Router();

router.post("/signup", validation(validators.signup), signup);
router.post("/signin", validation(validators.signin), signin);
router.get("/allusers", allUsers);
router.get("/verify/:token", verifyEmail);
router.get("/reguestEmailToken/:token", refreshToken);
router.patch("/sendCode", sendCode);
router.patch("/forgetpassword", forgetPassword);

export default router;
