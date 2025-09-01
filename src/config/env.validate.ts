import * as Joi from 'joi';

export default Joi.object({
  NODE_ENV: Joi.string().valid('development').default('development'),
  DATABASE_PORT: Joi.number().port().default(5432),
  DATABASE_HOST: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_USER: Joi.string().required(),
  DATABASE_DB: Joi.string().required(),
});
