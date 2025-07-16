import { Router } from "express";
import { verifyToken } from "../middlewares/authMiddleware";
import { sendMessage } from "../controllers/messageController";



const router = Router();

router.post('/',verifyToken,sendMessage); //Ruta para enviar mensaje


export default router;
