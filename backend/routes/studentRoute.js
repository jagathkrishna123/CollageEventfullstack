import { Router } from "express";
import { studentLogin } from "../controller/login/studentlogin.js";
const router = Router();

router.post("/studentLogin", studentLogin);
export default router;
