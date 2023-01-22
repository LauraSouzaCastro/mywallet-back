import { listaRegistros, criaRegistros } from "../controllers/Registros.js";
import { Router } from 'express';
import { autenticacaoValida } from "../middlewares/AutenticacaoMiddleware.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { registroSchema } from "../schema/RegistroSchema.js";

const registrosRouter = Router();
registrosRouter.use(autenticacaoValida);
registrosRouter.get("/home", listaRegistros);
registrosRouter.post("/nova-entrada", validateSchema(registroSchema), criaRegistros);
registrosRouter.post("/nova-saida", validateSchema(registroSchema), criaRegistros);
export default registrosRouter;