import { Router } from 'express';
import { getCards, deleteCard, createCard, likeCard, dislikeCard } from '../controllers/cards'

const cardRouter = Router();

cardRouter.get('/', getCards);
cardRouter.delete('/:cardId', deleteCard);
cardRouter.post('/', createCard);
cardRouter.put('/:cardId/likes', likeCard);
cardRouter.delete('/:cardId/likes', dislikeCard);

export default cardRouter;