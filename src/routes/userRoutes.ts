import { Router } from "express";
import { activateAccount, loginUser, registerUser } from "../controllers/userController";
import { validateUserRegister } from "../middlewares/validateUserRegister";
import { validateUserLogin } from "../middlewares/validateUserLogin";

const router = Router();

router.post('/register',validateUserRegister ,registerUser);
router.get('/activate',activateAccount);
router.post('/login',validateUserLogin ,loginUser);

export default router;
