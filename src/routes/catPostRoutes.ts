import { Router } from "express";
import { createCatPost, deleteCatPostById, getCatPostsByUser, updateCatPostById } from "../controllers/catPostController";
import { verifyToken } from "../middlewares/authMiddleware";
import { upload } from "../config/cloudinary";


const router = Router();

router.post('/',verifyToken,upload.single('photo'),createCatPost);
router.put('/:id',verifyToken,upload.single('photo'),updateCatPostById);
router.delete('/:id',verifyToken ,deleteCatPostById);      // Eliminar un catpost por ID
router.get('/user/:userId', getCatPostsByUser); 
/* 

router.get('/:id', getCatPostById);            // Obtener un catpost por ID

router.get('/', getAllCatPosts);           //Obtener todos los post

router.patch('/:id/status', updateCatPostStatus); //Actualizar estado activo/resuelto
*/

export default router;
