import { Router } from "express";
import { createCatPost, deleteCatPostById, getAllCatPosts, getCatPostsByUser, updateCatPostById, updateCatPostStatus } from "../controllers/catPostController";
import { verifyToken } from "../middlewares/authMiddleware";
import { upload } from "../config/cloudinary";


const router = Router();

router.get('/', getAllCatPosts); //Obtener todos los post
router.get('/:id', getCatPostById);   // Obtener un catpost por ID
router.post('/',verifyToken,upload.single('photo'),createCatPost); //Crear post
router.put('/:id',verifyToken,upload.single('photo'),updateCatPostById); //Actulizar post
router.delete('/:id',verifyToken ,deleteCatPostById);      // Eliminar un catpost por ID
router.get('/user/:userId', getCatPostsByUser);  //Obtener todos los post de un usuario
router.patch('/:id/status',verifyToken ,updateCatPostStatus);//Actualizar estado activo/resuelto


export default router;
