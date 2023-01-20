import bcrypt from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';
import db from '../config/database.js';
import joi from 'joi';

const usuarioSchema = joi.object({
  nome: joi.string().required(),
  email: joi.string().email().required(),
  senha: joi.string().required(),
  senhaConfirmada: joi.string().valid(joi.ref('senha')).required()
});

export async function cadastro(req, res) {
  const { nome, email, senha, senhaConfirmada } = req.body;
  const { error } = usuarioSchema.validate({ nome, email, senha, senhaConfirmada });
  if (error) {
    const errorMessages = error.details.map(err => err.message);
    return res.status(422).send(errorMessages);
  }
  const usuario = await db.collection('usuarios').findOne({ email });
  if (usuario) return res.status(409).send("Esse email já está cadastrado!");

  const senhaHashed = bcrypt.hashSync(senha, 10);
  try {
    await db.collection("usuarios").insertOne({ nome, email, senha: senhaHashed });
    res.status(201).send("Usuário cadastrado com sucesso!");
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function login(req, res) {
  const { email, senha } = req.body;
  try {
    const usuario = await db.collection('usuarios').findOne({ email });
    if (!usuario) return res.status(400).send("Usuário ou senha incorretos");

    const senhaCorreta = bcrypt.compareSync(senha, usuario.senha);
    if (!senhaCorreta) return res.status(400).send("Usuário ou senha incorretos");

    const token = uuidV4();

    const logado = await db.collection("sessoes").findOne({ idUsuario: usuario._id });
    if (logado) await db.collection("sessoes").deleteOne({ idUsuario: usuario._id });

    await db.collection("sessoes").insertOne({ idUsuario: usuario._id, token });
    res.status(200).send(token);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function usuarios(req, res) {
	db.collection("usuarios").find().toArray().then(dados => {
		return res.send(dados)
	}).catch(() => {
		res.status(500).send("Deu erro no servidor de banco de dados")
	});
}

export async function sessoes(req, res) {
	db.collection("sessoes").find().toArray().then(dados => {
		return res.send(dados)
	}).catch(() => {
		res.status(500).send("Deu erro no servidor de banco de dados")
	});
}