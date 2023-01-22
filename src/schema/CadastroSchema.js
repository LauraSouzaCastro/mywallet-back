import joi from 'joi';

export const cadastroSchema = joi.object({
    nome: joi.string().required().error(new Error('Preencha com um nome válido!')),
    email: joi.string().email().required().error(new Error('Preencha com um e-mail válido!')),
    senha: joi.string().required().error(new Error('Preencha com uma senha válida!')),
    senhaConfirmada: joi.string().valid(joi.ref('senha')).required().error(new Error('Preencha com a mesma senha!'))
});