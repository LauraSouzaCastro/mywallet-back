import joi from 'joi';

export const registroSchema = joi.object({
  valor: joi.string().required(),
  descricao: joi.string().required(),
  tipo: joi.string().required()
})