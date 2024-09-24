import { Router } from "express";
import { authMiddlewares } from "../middlewares/authMiddlewares.js";
import { addPost, deletePost, fectchPost, fectchPostById, updatePost } from "../controllers/post.controller.js";

const router = Router();
router.get('/', fectchPost);
router.get('/:id', authMiddlewares,fectchPostById)
router.post('/add', authMiddlewares,addPost);
router.put('/update/:id', authMiddlewares,updatePost);
router.delete('/delete/:id', authMiddlewares,deletePost);
export default router;