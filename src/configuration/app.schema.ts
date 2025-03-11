import * as Joi from 'joi';

export default Joi.object({
  NODE_ENV: Joi.required(),
  PORT: Joi.required(),
  // DATABASE
  DB_HOST: Joi.required(),
  DB_PORT: Joi.required(),
  DB_USER: Joi.required(),
  DB_PASSWORD: Joi.required(),
  DB_NAME: Joi.required(),
  // FLAGSMITH
  FLAGSMITH_ENVIRONMENT_KEY: Joi.required(),
});
