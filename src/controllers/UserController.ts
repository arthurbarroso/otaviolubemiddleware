import { Request, Response } from "express";
import { hashPass } from "../services/AuthService"
import UserService from "../services/UserService";

class UsuarioController {
   async createUsuario(req: Request, res: Response): Promise<Response> {
       const { name, email, password } = req.body;
       if(!name || !email || !password) return res.status(400)
           .json({error: "Certifique-se de que está enviando os campos email, name e password"});

       try {
           const hashedPass = await hashPass(password)
           const user = await UserService.createUser(name, email, hashedPass);

           return res.status(200).json({user: {email: user.email, name: user.name}});
       } catch (_e) {
           return res.status(400).json({erro: "Um erro ocorreu. Cheque sua combinação de email, name e password"});
       }
   }

    async login(req: Request, res: Response): Promise<Response> {
       const {email, password } = req.body;
       if(!email || !password) return res.status(400)
           .json({error: "Certifique-se de que está enviando os campos email e password"});

       try {
           const r = await UserService.login(email, password);

           return res.status(200).json(r);
       } catch (_e) {
           return res.status(400).json({erro: "Um erro ocorreu. Cheque sua combinação de email e password"});
       }
   }
}

export default new UsuarioController();
