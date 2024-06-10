import { PrismaClient, User, Post } from "@prisma/client";

class PostService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async listPosts(){
      return await this.prisma.post.findMany();
  }

  async createPost(authorId: number, content: string, title: string, published: boolean) {
      return await this.prisma.post.create({
          data: { content: content,
                  title: title,
                  published: published,
                  author: {connect: {id: authorId}} }
      })
  }

  async findById(postId: number){
    return await this.prisma.post.findFirst({where: {id: postId}})
  }
}

export default new PostService();
