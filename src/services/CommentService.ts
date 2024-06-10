import { PrismaClient } from "@prisma/client";

class CommentService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async listPostComments(postId: number){
      return await this.prisma.comment.findMany({where: { postId: postId}})
  }

  async createComment(content: string, authorId: number, postId: number) {
      return await this.prisma.comment.create({
          data: { content: content,
                  author: {connect: {id: authorId}},
                  post: {connect: {id: postId}}}
      })
  }
}

export default new CommentService();
