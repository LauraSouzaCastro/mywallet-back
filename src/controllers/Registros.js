import db from '../config/database.js';
import dayjs from 'dayjs';
export async function listaRegistros(req, res) {
    try {
        const logado = res.locals.sessao;
        const registros = await db.collection("registros").find({idUsuario: logado.idUsuario}).toArray();
        let saldo = 0;
        for(let i = 0; i < registros.length; i++){
            if(registros[i].tipo === 'saida'){
                saldo -= Number(registros[i].valor);
            }else if(registros[i].tipo === 'entrada'){
                saldo += Number(registros[i].valor);
            }
        }
        return res.send({registros: registros.reverse(), saldo: saldo.toFixed(2)});
    } catch (error) {
        res.status(500).send("Erro no servidor");
    }
}

export async function criaRegistros(req, res) {
    try {
        const registro = req.body;
        const logado = res.locals.sessao;
        await db.collection("registros").insertOne({ valor: registro.valor, descricao: registro.descricao, tipo: registro.tipo, data: `${dayjs().format('DD/MM')}`, idUsuario: logado.idUsuario });
        res.sendStatus(201);
    } catch (error) {
      res.status(500).send("Erro no servidor");
    }
}