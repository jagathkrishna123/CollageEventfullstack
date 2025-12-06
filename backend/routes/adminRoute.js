import { Router } from "express";
import { createAdmin } from "../controller/signup/Admin.js";
import { adminLogin } from "../controller/login/AdminLogin.js";

const router = Router();

router.post("/createAdmin", createAdmin);
router.post("/adminLogin", adminLogin);

export default router;
