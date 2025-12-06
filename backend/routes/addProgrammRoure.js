import { Router } from "express";
import { addProgramming } from "../controller/addProgramm/addProgramm.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = Router();

router.post("/addProgramming", verifyToken, addProgramming);

export default router;
