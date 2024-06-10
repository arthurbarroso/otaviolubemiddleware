import PostService from "../services/PostService";
import { Response, Request } from "express";

export class PostController {
    async listPost(req: Request, res: Response): Promise<Response>{
        const posts = await PostService.listPosts();
        return res.status(200).json({posts: posts});
    }

    async createPost(req: Request, res: Response): Promise<Response>{
        const { title, content } = req.body;
        if(!title || !content) return res.status(400).json({error: "Certifique-se de que está enviando os campos title e content"});
        const post = await PostService.createPost(req.user.id, content, title, true)
        return res.status(200).json({post: post});
    }
}

export default new PostController();
