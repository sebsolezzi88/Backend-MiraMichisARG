import { Router } from "express";
import { activateAccount, loginUser, registerUser } from "../controllers/userController";
import { validateUserRegister } from "../middlewares/validateUserRegister";

const router = Router();

router.post('/register',validateUserRegister ,registerUser);
router.get('/activate',activateAccount);
router.post('/login', loginUser);

export default router;
