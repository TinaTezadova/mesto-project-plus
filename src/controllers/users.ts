import { Request, Response, NextFunction } from 'express';
import { Error } from 'mongoose';
import { ICustomRequest } from '../types';
import { StatusCode } from '../consts';
import RequestError from '../errors/requestErrorConstructor';
import UsersService from '../services/usersService';

const usersService = new UsersService();

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await usersService.getUsers();
    console.log('mk;mk;m;', users);

    return res.status(StatusCode.SUCSESS).send(users);
  } catch {
    const error = new RequestError('Произошла техническая ошибка', StatusCode.SERVER_ERROR)
    return next(error);
  }
}

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await usersService.getUser(req.params.userId);
    if (!user) {
      const error = new RequestError('Запрашиваемый пользователь не найден', StatusCode.NOT_FOUND);
      return next(error)
    }
    return res.status(StatusCode.SUCSESS).send(user);
  } catch (err) {
    let error = new RequestError('Произошла техническая ошибка', StatusCode.SERVER_ERROR);
    if (err instanceof Error.CastError) {
      error = new RequestError('Передан некоррекный id', StatusCode.BAD_REQUEST)
    }
    return next(error)
  }
}

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await usersService.createUser(req.body);
    return res.status(StatusCode.CREATED).send(user);
  } catch (err) {
    let error = new RequestError('Произошла техническая ошибка', StatusCode.SERVER_ERROR);
    if (err instanceof Error.ValidationError) {
      error = new RequestError('Переданы некорректные данные', StatusCode.BAD_REQUEST)
    }
    return next(error)
  }
}

export const updateUser = async (req: ICustomRequest, res: Response, next: NextFunction) => {
  try {
    const user = await usersService.updateUser(req);
    if (!user) {
      const error = new RequestError('Запрашиваемый пользователь не найден', StatusCode.NOT_FOUND);
      return next(error)
    }
    return res.status(StatusCode.SUCSESS).send(user);
  } catch (err) {
    let error = new RequestError('Произошла техническая ошибка', StatusCode.SERVER_ERROR);
    if (err instanceof Error.ValidationError) {
      error = new RequestError('Переданы некорректные данные', StatusCode.BAD_REQUEST)
    }
    return next(error)
  }
}

export const updateUserAvatar = async (req: ICustomRequest, res: Response, next: NextFunction) => {
  try {
    const user = await usersService.updateUserAvatar(req);
    if (!user) {
      const error = new RequestError('Запрашиваемый пользователь не найден', StatusCode.NOT_FOUND);
      return next(error)
    }
    return res.status(StatusCode.SUCSESS).send(user);
  } catch (err) {
    let error = new RequestError('Произошла техническая ошибка', StatusCode.SERVER_ERROR);
    if (err instanceof Error.ValidationError) {
      error = new RequestError('Переданы некорректные данные', StatusCode.BAD_REQUEST)
    }
    return next(error)
  }
}