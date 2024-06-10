import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { genJwt } from "./AuthService";

class UserService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createUser(name: string, email: string, password: string) {
    return await this.prisma.user.create({data: {name: name, email: email, password: password}})
  }

  async login(email: string, password: string){
    const user = await this.prisma.user.findFirst({where: {email: {equals: email}}});
    if(!user){
      return {token: null, error: "Dados incorretos"}
    }

    const match = await bcrypt.compare(password, user.password);
    if(!match){
      return {token: null, error: "Dados incorretos"}
    }

    const token = genJwt(user.email, user.id);
    return {token: token, error: null}
  }
}

export default new UserService();
