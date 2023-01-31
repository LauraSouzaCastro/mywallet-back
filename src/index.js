import express from "express";
import cors from "cors";
import autenticacaoRouter from "./routes/AutenticacaoRoute.js";
import registrosRouter from './routes/RegistrosRoute.js';

const server = express();
server.use(express.json());
server.use(cors());

server.use(autenticacaoRouter);
server.use(registrosRouter);
server.listen(process.env.PORT, () => console.log('Servidor OK'));