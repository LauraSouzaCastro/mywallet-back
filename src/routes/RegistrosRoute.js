import { listaRegistros } from "../controllers/Registros.js";
import { Router } from 'express';
import { autenticacaoValida } from "../middlewares/AutenticacaoMiddleware.js";

const registrosRouter = Router();
registrosRouter.use(autenticacaoValida);
registrosRouter.get("/home", listaRegistros);

export default registrosRouter;