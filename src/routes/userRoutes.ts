import { Router } from "express";
import { loginUser, registerUser } from "../controllers/userController";
import { validateUserRegister } from "../middlewares/validateUserRegister";

const router = Router();

router.post('/register',validateUserRegister ,registerUser);
router.post('/login', loginUser);

export default router;
