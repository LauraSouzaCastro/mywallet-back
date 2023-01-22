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

export async function criaRegistros(req, res) {
    try {
        const registro = req.body;
        const logado = res.locals.sessao;
        await db.collection("registros").insertOne({ valor: registro.valor, descricao: registro.descricao, tipo: registro.tipo, idUsuario: logado.idUsuario });
        res.sendStatus(201);
    } catch (error) {
      res.status(500).send("Erro no servidor");
    }
}