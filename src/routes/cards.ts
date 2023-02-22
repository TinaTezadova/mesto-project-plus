import { Router } from 'express';
import { Joi } from 'celebrate';
import {
  getCards, deleteCard, createCard, likeCard, dislikeCard,
} from '../controllers/cards';
import { getCelebrateConfig } from '../utils';

const cardRouter = Router();

cardRouter.get('/', getCelebrateConfig(), getCards);

cardRouter.delete('/:cardId', getCelebrateConfig({
  cardId: Joi.string().alphanum(),
}), deleteCard);

cardRouter.post('/', getCelebrateConfig(undefined, {
  name: Joi.string().required().min(2).max(30),
  link: Joi.string().required(),
}), createCard);

cardRouter.put('/:cardId/likes', getCelebrateConfig({
  cardId: Joi.string().alphanum(),
}), likeCard);

cardRouter.delete('/:cardId/likes', getCelebrateConfig({
  cardId: Joi.string().alphanum(),
}), dislikeCard);

export default cardRouter;
