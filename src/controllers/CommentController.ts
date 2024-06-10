import { Response, Request } from "express";
import CommentService from "../services/CommentService";

export class CommentController {
    async listPostComments(req: Request, res: Response): Promise<Response>{
        const { postId } = req.params;
        if(!postId) return res.status(400).json({error: "Informe um postId"})
        const postIdn = parseInt(postId)
        const comments = await CommentService.listPostComments(postIdn)
        return res.status(200).json({comments: comments});
    }

    async createComment(req: Request, res: Response): Promise<Response>{
        const { content } = req.body;
        const { postId } = req.params;
        const postIdn = parseInt(postId)
        if(!content) return res.status(400).json({error: "Certifique-se de que está enviando o campo content"});
        const comment = await CommentService.createComment(content, req.user.id, postIdn)
        return res.status(200).json({comment: comment});
    }
}

export default new CommentController();
