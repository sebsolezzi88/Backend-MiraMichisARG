import { Router } from "express";
import { verifyToken } from "../middlewares/authMiddleware";


const router = Router();

router.get('/:catPostId/comments', getPostComments); // Obtener todos los comentarios de un post
router.post('/:catPostId/comments', verifyToken, addComment); // Crear comentario
router.delete('/:catPostId/comments/:commentId', verifyToken, deleteComment); // Eliminar un comentario
router.put('/:catPostId/comments/:commentId', verifyToken, updateComment); // Editar un comentario



export default router;
