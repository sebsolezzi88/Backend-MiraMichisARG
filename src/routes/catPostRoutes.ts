import { Router } from "express";
import { createCatPost } from "../controllers/catPostController";
import { verifyToken } from "../middlewares/authMiddleware";
import { upload } from "../config/cloudinary";


const router = Router();

router.post('/',verifyToken,upload.single('photo'),createCatPost);

/* 
router.post('/', createCatPost);               // Crear un nuevo catpost
router.get('/:id', getCatPostById);            // Obtener un catpost por ID
router.put('/:id', updateCatPostById);         // Actualizar un catpost por ID
router.delete('/:id', deleteCatPostById);      // Eliminar un catpost por ID
router.get('/', getAllCatPosts);           //Obtener todos los post
router.get('/user/:userId', getCatPostsByUser); //Que un usuario obtenga sus post
router.patch('/:id/status', updateCatPostStatus); //Actualizar estado activo/resuelto
*/

export default router;
