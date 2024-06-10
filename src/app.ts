import express from "express";
import "dotenv/config";

import UserRouter from "./routes/UserRouter";
import PostRouter from "./routes/PostRouter";

if(!process.env.JWT_SECRET){
    console.log("Por favor informe o segredo a ser utilizado para a geração de tokens JWT.")
    process.exit(1)
}

const server = express();

server.use(express.urlencoded({extended: true}));
server.use(express.json());

server.use(UserRouter);
server.use(PostRouter);

server.listen(3000);

