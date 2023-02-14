import { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import { ICustomRequest } from '../types';
import { findByIdAndUpdateParams, ErrorCode } from '../consts';
import RequestError from '../errors/requestErrorConstructor';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
    const users = await User.find({});
    return res.status(ErrorCode.SUCSESS).send(users);
  } catch {
    const error = new RequestError('Произошла техническая ошибка', ErrorCode.SERVER_ERROR)
    return next(error);
  }
}

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.params.userId);
    if(!user) {
      const error = new RequestError('Запрашиваемый пользователь не найден', ErrorCode.NOT_FOUND);
      return next(error)
    }
    return res.status(ErrorCode.SUCSESS).send(user);
  } catch {
    const error = new RequestError('Произошла техническая ошибка', ErrorCode.SERVER_ERROR)
    return next(error);
  }
}

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.create(req.body);
    return res.status(ErrorCode.CREATED).send(user);
  } catch (err) {
    let error = new RequestError('Произошла техническая ошибка', ErrorCode.SERVER_ERROR);
    if(err instanceof Error && err.name === 'ValidationError') {
      error = new RequestError('Переданы некорректные данные', ErrorCode.BAD_REQUEST)
    }
    return next(error)
  }
}

export const updateUser = async (req: ICustomRequest, res: Response, next: NextFunction) => {
  const userId = req?.user?._id;
  try {
    const user = await User.findByIdAndUpdate(userId, req.body, findByIdAndUpdateParams);
    if(!user) {
      const error = new RequestError('Запрашиваемый пользователь не найден', ErrorCode.NOT_FOUND);
      return next(error)
    }
    return res.status(ErrorCode.SUCSESS).send(user);
  } catch (err) {
    let error = new RequestError('Произошла техническая ошибка', ErrorCode.SERVER_ERROR);
    if(err instanceof Error && err.name === 'ValidationError') {
      error = new RequestError('Переданы некорректные данные', ErrorCode.BAD_REQUEST)
    }
    return next(error)
  }
}

export const updateUserAvatar = async (req: ICustomRequest, res: Response, next: NextFunction) => {
  const userId = req?.user?._id;
  try {
    const user = await User.findByIdAndUpdate(userId, req.body, findByIdAndUpdateParams);
    if(!user) {
      const error = new RequestError('Запрашиваемый пользователь не найден', ErrorCode.NOT_FOUND);
      return next(error)
    }
    return res.status(ErrorCode.SUCSESS).send(user);
  } catch (err) {
    let error = new RequestError('Произошла техническая ошибка', ErrorCode.SERVER_ERROR);
    if(err instanceof Error && err.name === 'ValidationError') {
      error = new RequestError('Переданы некорректные данные', ErrorCode.BAD_REQUEST)
    }
    return next(error)
  }
}