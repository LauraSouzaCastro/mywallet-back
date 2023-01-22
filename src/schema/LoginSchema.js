import joi from 'joi';

export const loginSchema = joi.object({
    email: joi.string().email().required().error(new Error('Preencha com um e-mail válido!')),
    senha: joi.string().required().error(new Error('Preencha com uma senha válida!')),
});