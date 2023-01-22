import db from '../config/database.js';

export async function autenticacaoValida(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", '');
  if (!token) return res.status(422).send("Informe o token!");
  try {
    const logado = await db.collection("sessoes").findOne({ token });
    if (!logado) return res.status(401).send("Você não tem autorização para ver os registros");
    res.locals.sessao = logado;
    next();
  } catch (error) {
    res.status(500).send(error);
  }
}