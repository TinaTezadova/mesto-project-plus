import { Request, Response, NextFunction } from 'express';
import { ObjectId } from 'mongoose';
import { ICustomRequest } from '../types';
import Card from '../models/card';
import { ErrorCode, findByIdAndUpdateParams } from '../consts';
import RequestError from '../errors/requestErrorConstructor';

export const getCards = async (req: Request, res: Response, next: NextFunction) => {
    try {
    const cards = await Card.find({});
    return res.status(ErrorCode.SUCSESS).send(cards);
  } catch {
    const error = new RequestError('Произошла техническая ошибка', ErrorCode.SERVER_ERROR)
    return next(error);
  }
}

export const createCard = async (req: ICustomRequest, res: Response, next: NextFunction) => {
  const userId = req?.user?._id;
  try {
    const card = await Card.create({ ...req.body, owner: userId });
    return res.status(ErrorCode.CREATED).send(card);
  } catch (err) {
    let error = new RequestError('Произошла техническая ошибка', ErrorCode.SERVER_ERROR);
    if(err instanceof Error && err.name === 'ValidationError') {
      error = new RequestError('Переданы некорректные данные', ErrorCode.BAD_REQUEST)
    }
    return next(error)
  }
}

export const deleteCard = async (req: ICustomRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req?.user?._id;
    const card = await Card.findById(req.params.cardId);
    if(!card) {
      const error = new RequestError('Карточка не найдена', ErrorCode.NOT_FOUND);
      return next(error)
    }
    if(userId !== String(card.owner)) {
      const error = new RequestError('Вы не можете удалить чужую карточку', ErrorCode.FORBIDDEN);
      return next(error)
    }
    return res.status(ErrorCode.SUCSESS).send(card);
  } catch (err) {
    let error = new RequestError('Произошла техническая ошибка', ErrorCode.SERVER_ERROR);
    if(err instanceof Error && err.name === 'CastError') {
      error = new RequestError('Передан некоррекный id', ErrorCode.BAD_REQUEST)
    }
    return next(error)
  }
}

export const likeCard = async (req: ICustomRequest, res: Response, next: NextFunction) => {
  const userId = req?.user?._id as ObjectId;
  const cardId = req.params.cardId
  try {
    const card = await Card.findByIdAndUpdate(cardId, { $addToSet: { likes: userId } }, findByIdAndUpdateParams);
    if(!card) {
      const error = new RequestError('Карточка не найдена', ErrorCode.NOT_FOUND);
      return next(error)
    }
    return res.status(ErrorCode.SUCSESS).send(card);
  } catch (err) {
    let error = new RequestError('Произошла техническая ошибка', ErrorCode.SERVER_ERROR);
    if(err instanceof Error && err.name === 'CastError') {
      error = new RequestError('Передан некоррекный id', ErrorCode.BAD_REQUEST)
    }
    return next(error)
  }
}

export const dislikeCard = async (req: ICustomRequest, res: Response, next: NextFunction) => {
  const userId = req?.user?._id as ObjectId;
  const cardId = req.params.cardId
  try {
    const card = await Card.findByIdAndUpdate(cardId, { $pull: { likes: userId } }, findByIdAndUpdateParams);
    if(!card) {
      const error = new RequestError('Карточка не найдена', ErrorCode.NOT_FOUND);
      return next(error)
    }
    return res.status(ErrorCode.SUCSESS).status(ErrorCode.SUCSESS).send(card);
  } catch (err) {
    let error = new RequestError('Произошла техническая ошибка', ErrorCode.SERVER_ERROR);
    if(err instanceof Error && err.name === 'CastError') {
      error = new RequestError('Передан некоррекный id', ErrorCode.BAD_REQUEST)
    }
    return next(error)
  }
}