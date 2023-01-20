import { cadastro, login, usuarios, sessoes } from "../controllers/Autenticacao.js";
import { Router } from 'express';

const autenticacaoRouter = Router();

autenticacaoRouter.post("/cadastro", cadastro);
autenticacaoRouter.post("/", login);
autenticacaoRouter.get("/usuarios", usuarios);
autenticacaoRouter.get("/sessoes", sessoes);

export default autenticacaoRouter;