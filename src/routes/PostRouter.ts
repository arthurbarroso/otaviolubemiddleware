import express from "express";
import PostController from "../controllers/PostController";
import CommentController from "../controllers/CommentController";
import authMiddleware from "../AuthMiddleware";


const router = express.Router();
router.use(authMiddleware)
router.get("/posts", PostController.listPost);
router.post("/posts", PostController.createPost);
router.get("/posts/:postId/comments", CommentController.listPostComments)
router.post("/posts/:postId/comments", CommentController.createComment)
export default router;
