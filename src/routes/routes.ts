import { Router } from "express";
import RegisterUserController from "../controller/RegisterUserController";
import LoginUserController from "../controller/LoginUserController";

const router = Router();

router.post('/register', RegisterUserController.registerUser);
router.post('/login', LoginUserController.loginUser);

export default router;