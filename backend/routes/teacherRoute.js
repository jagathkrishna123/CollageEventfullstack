import { Router } from "express";
import { teacherLogin } from "../controller/login/teacherLogin.js";

const router = Router();

router.post("/teacherlogin", teacherLogin);
export default router;
