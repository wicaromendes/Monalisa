import Joi from 'joi';

interface User {
  nome: string;
  email: string;
}

export const UserValidator = Joi.object<User>({
  nome: Joi.string().required(),
  email: Joi.string().email().required()
});
