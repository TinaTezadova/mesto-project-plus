import { celebrate, Joi } from 'celebrate';

export const getCelebrateConfig = (params?: object, body?: object) => {
  return celebrate({
    headers: Joi.object().keys({
      authorization: Joi.string().required()
    }).unknown(true),
    params: Joi.object().keys(params),
    body: Joi.object().keys(body)
  })
}

export const getCelebrationConfForLogin = () => {
  return celebrate({
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
  })
}