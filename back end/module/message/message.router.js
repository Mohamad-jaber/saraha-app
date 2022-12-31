import { Router } from "express";
import { auth } from "../../middlewear/auth.js";
import { myMessages, sendMessage ,deleteMessage} from "./controller/message.controller.js";

const router = Router();

router.post('/:userId',sendMessage)
router.get('/',auth(),myMessages);
router.delete('/:id',auth(),deleteMessage);

export default router;