import { Router } from "express";

import { addEvent } from "../controller/addEvent/addEvent.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { upload } from "../middleware/upload.js";

const  router = Router();

router.post("/addEvent",verifyToken, upload.array("images", 10), addEvent);

export default router;
