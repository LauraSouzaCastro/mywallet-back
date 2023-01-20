import express from "express";
import cors from "cors";
import autenticacaoRouter from "./routes/AutenticacaoRoutes.js";

const server = express();
server.use(express.json());
server.use(cors());

server.use(autenticacaoRouter);

server.listen(5000, () => console.log('Servidor OK'));