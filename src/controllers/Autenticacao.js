import bcrypt from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';
import db from '../config/database.js';

export async function cadastro(req, res) {
  const { nome, email, senha } = req.body;

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
    res.status(200).send({nome: usuario.nome , token});
  } catch (error) {
    res.status(500).send(error.message);
  }
}