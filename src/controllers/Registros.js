import db from '../config/database.js';

export async function listaRegistros(req, res) {
        try {
        const logado = res.locals.sessao;
        const registros = await db.collection("registros").find({idUsuario: logado.idUsuario}).toArray();
        return res.send(registros);
    } catch (error) {
        res.status(500).send("Erro no servidor");
    }
  }