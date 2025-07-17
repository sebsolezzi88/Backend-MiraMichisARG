import { Router } from "express";
import { activateAccount, loginUser, registerUser, updateProfile } from "../controllers/userController";
import { validateUserRegister } from "../middlewares/validateUserRegister";
import { validateUserLogin } from "../middlewares/validateUserLogin";
import { upload } from "../config/cloudinary";
import { verifyToken } from "../middlewares/authMiddleware";
import { validateProfileUpdate } from "../middlewares/validateProfileUpdate";

const router = Router();

router.post('/register',validateUserRegister ,registerUser);
router.get('/activate',activateAccount);
router.post('/login',validateUserLogin ,loginUser);
router.put('/profile',verifyToken,validateProfileUpdate,upload.single('photo'),updateProfile);

export default router;
