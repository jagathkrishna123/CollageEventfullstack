import { Router } from "express";
import { register } from "../controller/signup/register.js";

const router = Router();

router.post("/register", register);
export default router;
