import { Request, Response, NextFunction } from 'express';
import { ObjectId, Error } from 'mongoose';
import { ICustomRequest } from '../types';
import { StatusCode } from '../consts';
import RequestError from '../errors/requestErrorConstructor';
import CardsService from '../services/cardsService';

const cardsService = new CardsService();

export const getCards = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cards = await cardsService.getCards();
    return res.status(StatusCode.SUCSESS).send(cards);
  } catch {
    const error = new RequestError('На сервере произошла ошибка', StatusCode.SERVER_ERROR);
    return next(error);
  }
};

export const createCard = async (req: ICustomRequest, res: Response, next: NextFunction) => {
  try {
    const card = await cardsService.createCard(req);
    return res.status(StatusCode.CREATED).send(card);
  } catch (err) {
    let error = new RequestError('На сервере произошла ошибка', StatusCode.SERVER_ERROR);
    if (err instanceof Error.ValidationError) {
      error = new RequestError('Переданы некорректные данные', StatusCode.BAD_REQUEST);
    }
    return next(error);
  }
};

export const deleteCard = async (req: ICustomRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req?.user?._id;
    const { cardId } = req.params;
    const card = await cardsService.getCard(cardId);
    if (!card) {
      const error = new RequestError('Карточка не найдена', StatusCode.NOT_FOUND);
      return next(error);
    }
    if (userId !== String(card.owner)) {
      const error = new RequestError('Вы не можете удалить чужую карточку', StatusCode.FORBIDDEN);
      return next(error);
    }
    await cardsService.deleteCard(cardId);
    return res.status(StatusCode.SUCSESS).send({ message: 'Карточка успешно удалена' });
  } catch (err) {
    let error = new RequestError('На сервере произошла ошибка', StatusCode.SERVER_ERROR);
    if (err instanceof Error.CastError) {
      error = new RequestError('Передан некоррекный id', StatusCode.BAD_REQUEST);
    }
    return next(error);
  }
};

export const likeCard = async (req: ICustomRequest, res: Response, next: NextFunction) => {
  const userId = req?.user?._id as ObjectId;
  const { cardId } = req.params;
  try {
    const card = await cardsService.likeCard(cardId, userId);
    if (!card) {
      const error = new RequestError('Карточка не найдена', StatusCode.NOT_FOUND);
      return next(error);
    }

    return res.status(StatusCode.SUCSESS).send(card);
  } catch (err) {
    let error = new RequestError('На сервере произошла ошибка', StatusCode.SERVER_ERROR);
    if (err instanceof Error.CastError) {
      error = new RequestError('Передан некоррекный id', StatusCode.BAD_REQUEST);
    }
    return next(error);
  }
};

export const dislikeCard = async (req: ICustomRequest, res: Response, next: NextFunction) => {
  const userId = req?.user?._id as ObjectId;
  const { cardId } = req.params;
  try {
    const card = await cardsService.dislikeCard(cardId, userId);
    if (!card) {
      const error = new RequestError('Карточка не найдена', StatusCode.NOT_FOUND);
      return next(error);
    }
    return res.status(StatusCode.SUCSESS).status(StatusCode.SUCSESS).send(card);
  } catch (err) {
    let error = new RequestError('На сервере произошла ошибка', StatusCode.SERVER_ERROR);
    if (err instanceof Error.CastError) {
      error = new RequestError('Передан некоррекный id', StatusCode.BAD_REQUEST);
    }
    return next(error);
  }
};
