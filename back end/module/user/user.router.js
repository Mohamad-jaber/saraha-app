import { Router } from "express";
import { auth } from "../../middlewear/auth.js";
import { DetectError, myMulter, validationTypes } from "../../service/multer.js";
import * as userController from "./controller/user.controller.js";

const router = Router();

router.get('/profile',auth(),userController.userProfile);
router.get(':/id',userController.getShareProfile);
router.patch('/updatepassword',auth(),userController.updatepassword);
router.get('/profilePic',myMulter('profile',validationTypes.image).single("image"),DetectError,auth(),userController.profilePic);
export default router;