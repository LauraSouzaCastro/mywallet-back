import { cadastro, login } from "../controllers/Autenticacao.js";
import { Router } from 'express';
import { validateSchema } from "../middlewares/validateSchema.js";
import { cadastroSchema } from '../schema/CadastroSchema.js';
import { loginSchema } from '../schema/LoginSchema.js';

const autenticacaoRouter = Router();

autenticacaoRouter.post("/cadastro", validateSchema(cadastroSchema), cadastro);
autenticacaoRouter.post("/", validateSchema(loginSchema), login);

export default autenticacaoRouter;